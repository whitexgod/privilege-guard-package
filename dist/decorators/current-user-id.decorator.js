"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserId = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentUserId = (0, common_1.createParamDecorator)((_data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.userId || request.headers['x-user-id'];
});
