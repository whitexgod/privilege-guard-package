export declare function getHeaderRoles(headers: Record<string, unknown>): Set<string>;
export declare function getHeaderPrivileges(headers: Record<string, unknown>): Set<string>;
export declare function hasRequiredRoleFromHeaders(headers: Record<string, unknown>, requiredRoles: string[]): boolean;
export declare function hasRequiredPrivilegeFromHeaders(headers: Record<string, unknown>, group: string, name: string): boolean;
