import { SetMetadata } from '@nestjs/common';
import { PRIVILEGE_METADATA_KEY } from '../constants/metadata.constants';

export const RequirePrivilege = (group: string, name: string) =>
  SetMetadata(PRIVILEGE_METADATA_KEY, { group, name });
