export declare enum PrivilegeGroup {
    POST = "POST",
    USER = "USER",
    ROLE = "ROLE",
    WORKSPACE = "WORKSPACE",
    MEMBERSHIP = "MEMBERSHIP",
    MEDIA = "MEDIA",
    SUBSCRIPTION = "SUBSCRIPTION",
    APP_SETTINGS = "APP_SETTINGS",
    USER_MANAGEMENT = "USER_MANAGEMENT",
    PRIVILEGE = "PRIVILEGE"
}
export declare enum PrivilegeName {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    ASSIGN = "ASSIGN"
}
export declare enum ErrorMessage {
    MISSING_USER_ID = "User ID not found. This endpoint requires X-User-Id header from API Gateway."
}
