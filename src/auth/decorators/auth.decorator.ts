import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ValidosRoles } from "src/interfaces";
import { RoleProtected } from "./";
import { UserRoleGuard } from "../guards";

export function Auth(...roles: ValidosRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}