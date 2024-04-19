import { UseGuards, applyDecorators } from "@nestjs/common";
import { ValidosRoles } from "src/interfaces";
import { RoleProtected } from "./";
import { UserRoleGuard } from "../guards";
import { AuthGuard } from "@nestjs/passport";

export function Auth(...roles: ValidosRoles[]) {
    console.log(roles)
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard('jwt'), UserRoleGuard)
    )
}