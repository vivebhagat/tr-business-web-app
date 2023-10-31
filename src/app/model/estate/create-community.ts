import { Property } from "./Dto/property";
import { Community } from "./community";

export class CreateCommunity {
    Community: Community = new Community;
    CommunityToPropertyMapList: Array<any> = [];
}