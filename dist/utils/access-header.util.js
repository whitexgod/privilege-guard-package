"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaderRoles = getHeaderRoles;
exports.getHeaderPrivileges = getHeaderPrivileges;
exports.hasRequiredRoleFromHeaders = hasRequiredRoleFromHeaders;
exports.hasRequiredPrivilegeFromHeaders = hasRequiredPrivilegeFromHeaders;
const SPLIT_PATTERN = /[,\s]+/;
function normalizeToken(value) {
    return value.trim().toUpperCase();
}
function parseHeaderValue(headerValue) {
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
        }
        catch {
            // Fall through to delimiter-based parsing.
        }
    }
    return trimmed
        .split(SPLIT_PATTERN)
        .map(value => value.replace(/^["']|["']$/g, ''))
        .map(normalizeToken)
        .filter(Boolean);
}
function getHeaderRoles(headers) {
    const roles = parseHeaderValue(headers['x-user-roles']);
    return new Set(roles);
}
function getHeaderPrivileges(headers) {
    const privileges = [
        ...parseHeaderValue(headers['x-user-privileges']),
        ...parseHeaderValue(headers['privileges']),
        ...parseHeaderValue(headers['x-privileges']),
    ];
    return new Set(privileges);
}
function hasRequiredRoleFromHeaders(headers, requiredRoles) {
    const roles = getHeaderRoles(headers);
    const privileges = getHeaderPrivileges(headers);
    if (roles.size === 0 && privileges.size === 0) {
        return false;
    }
    return requiredRoles.some(role => {
        const normalizedRole = role.toUpperCase();
        return (roles.has(normalizedRole) ||
            privileges.has(normalizedRole) ||
            privileges.has(`ROLE:${normalizedRole}`) ||
            privileges.has(`ROLES:${normalizedRole}`) ||
            privileges.has('*'));
    });
}
function hasRequiredPrivilegeFromHeaders(headers, group, name) {
    const privileges = getHeaderPrivileges(headers);
    if (privileges.size === 0) {
        return false;
    }
    const normalizedPrivilege = `${group}:${name}`.toUpperCase();
    return privileges.has(normalizedPrivilege);
}
