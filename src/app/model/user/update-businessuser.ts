import { BusinessUserToRoleMap } from "./business-user-to-role-map";
import { BusinessUser } from "./businessuser";

export class UpdateBusinessUser {
    BusinessUser: BusinessUser = new BusinessUser;
    BusinessUserToRoleMapList: Array<any> = [];
}