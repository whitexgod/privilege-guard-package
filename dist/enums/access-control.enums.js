"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.PrivilegeName = exports.PrivilegeGroup = void 0;
var PrivilegeGroup;
(function (PrivilegeGroup) {
    PrivilegeGroup["POST"] = "POST";
    PrivilegeGroup["USER"] = "USER";
    PrivilegeGroup["ROLE"] = "ROLE";
    PrivilegeGroup["WORKSPACE"] = "WORKSPACE";
    PrivilegeGroup["MEMBERSHIP"] = "MEMBERSHIP";
    PrivilegeGroup["MEDIA"] = "MEDIA";
    PrivilegeGroup["SUBSCRIPTION"] = "SUBSCRIPTION";
    PrivilegeGroup["APP_SETTINGS"] = "APP_SETTINGS";
    PrivilegeGroup["USER_MANAGEMENT"] = "USER_MANAGEMENT";
    PrivilegeGroup["PRIVILEGE"] = "PRIVILEGE";
})(PrivilegeGroup || (exports.PrivilegeGroup = PrivilegeGroup = {}));
var PrivilegeName;
(function (PrivilegeName) {
    PrivilegeName["CREATE"] = "CREATE";
    PrivilegeName["READ"] = "READ";
    PrivilegeName["UPDATE"] = "UPDATE";
    PrivilegeName["DELETE"] = "DELETE";
    PrivilegeName["ASSIGN"] = "ASSIGN";
})(PrivilegeName || (exports.PrivilegeName = PrivilegeName = {}));
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["MISSING_USER_ID"] = "User ID not found. This endpoint requires X-User-Id header from API Gateway.";
})(ErrorMessage || (exports.ErrorMessage = ErrorMessage = {}));
