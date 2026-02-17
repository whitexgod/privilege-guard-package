"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePrivilege = void 0;
const common_1 = require("@nestjs/common");
const metadata_constants_1 = require("../constants/metadata.constants");
const RequirePrivilege = (group, name) => (0, common_1.SetMetadata)(metadata_constants_1.PRIVILEGE_METADATA_KEY, { group, name });
exports.RequirePrivilege = RequirePrivilege;
