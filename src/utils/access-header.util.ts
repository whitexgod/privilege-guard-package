const SPLIT_PATTERN = /[,\s]+/;

function normalizeToken(value: string): string {
  return value.trim().toUpperCase();
}

function parseHeaderValue(headerValue: unknown): string[] {
  if (Array.isArray(headerValue)) {
    return headerValue.flatMap(v => parseHeaderValue(v)).filter(Boolean);
  }

  if (typeof headerValue !== 'string') {
    return [];
  }

  const trimmed = headerValue.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map(v => String(v))
          .map(normalizeToken)
          .filter(Boolean);
      }
    } catch {
      // Fall through to delimiter-based parsing.
    }
  }

  return trimmed
    .split(SPLIT_PATTERN)
    .map(value => value.replace(/^["']|["']$/g, ''))
    .map(normalizeToken)
    .filter(Boolean);
}

export function getHeaderRoles(headers: Record<string, unknown>): Set<string> {
  const roles = parseHeaderValue(headers['x-user-roles']);
  return new Set(roles);
}

export function getHeaderPrivileges(
  headers: Record<string, unknown>
): Set<string> {
  const privileges = [
    ...parseHeaderValue(headers['x-user-privileges']),
    ...parseHeaderValue(headers['privileges']),
    ...parseHeaderValue(headers['x-privileges']),
  ];
  return new Set(privileges);
}

export function hasRequiredRoleFromHeaders(
  headers: Record<string, unknown>,
  requiredRoles: string[]
): boolean {
  const roles = getHeaderRoles(headers);
  const privileges = getHeaderPrivileges(headers);

  if (roles.size === 0 && privileges.size === 0) {
    return false;
  }

  return requiredRoles.some(role => {
    const normalizedRole = role.toUpperCase();
    return (
      roles.has(normalizedRole) ||
      privileges.has(normalizedRole) ||
      privileges.has(`ROLE:${normalizedRole}`) ||
      privileges.has(`ROLES:${normalizedRole}`) ||
      privileges.has('*')
    );
  });
}

export function hasRequiredPrivilegeFromHeaders(
  headers: Record<string, unknown>,
  group: string,
  name: string
): boolean {
  const privileges = getHeaderPrivileges(headers);

  if (privileges.size === 0) {
    return false;
  }

  const normalizedPrivilege = `${group}:${name}`.toUpperCase();
  return privileges.has(normalizedPrivilege);
}
