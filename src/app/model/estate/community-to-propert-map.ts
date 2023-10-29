import { Property } from "./Dto/property";

export class CommunityToPropertyMap {
    Id: number = 0;
    Community: any;
    CommunityId: number = 0;
    Property: Property = new Property;
    PropertyId: number = 0;
}