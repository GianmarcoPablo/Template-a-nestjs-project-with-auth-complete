import { SetMetadata } from "@nestjs/common";
import { META_ROLES } from "../const/meta-roles";
import { ValidosRoles } from "src/interfaces";

export const RoleProtected = (...args: ValidosRoles[]) => {
    return SetMetadata(META_ROLES, args);
}