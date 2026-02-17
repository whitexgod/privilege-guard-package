# @itobuz/access-control

Reusable NestJS access-control primitives for microservices.

## Includes
- `PrivilegesGuard`
- `RequirePrivilege()` decorator
- `CurrentUserId()` decorator
- Header privilege utilities
- Enums: `PrivilegeGroup`, `PrivilegeName`, `ErrorMessage`

## Install

```bash
npm install @itobuz/access-control
```

## Publish to npm

### 1. Login to npm (once per machine)

```bash
npm login
```

### 2. Build and verify package contents

If your global npm cache has permission issues, use a local cache for this project:

```bash
npm_config_cache=.npm-cache npm run build
npm_config_cache=.npm-cache npm run packcheck
```

### 3. Bump version

```bash
npm version patch
# or: npm version minor
# or: npm version major
```

### 4. Publish

```bash
npm publish --access public
```

For this scoped package (`@itobuz/...`), the `--access public` flag is required on first publish.

## Use in another microservice

```bash
npm install @itobuz/access-control
```

Then import from your module/controller/resolver:

```ts
import {
  PrivilegesGuard,
  RequirePrivilege,
  CurrentUserId,
  PrivilegeGroup,
  PrivilegeName,
} from '@itobuz/access-control';
```

## Usage

```ts
import {
  PrivilegesGuard,
  RequirePrivilege,
  CurrentUserId,
  PrivilegeGroup,
  PrivilegeName,
} from '@itobuz/access-control';

@UseGuards(PrivilegesGuard)
@RequirePrivilege(PrivilegeGroup.USER, PrivilegeName.READ)
```

If your service is GraphQL, ensure the request context includes incoming headers used by this package.

## Headers expected
- `x-user-id`
- `x-user-privileges` (or `privileges` / `x-privileges`)
