import { COMMUNITY_CONSTANTS } from "src/app/constants/estate/community-constant";
import { Property } from "src/app/model/estate/Dto/property";
import { Community } from "src/app/model/estate/community";
import { CommunityToPropertyMap } from "src/app/model/estate/community-to-property-map";


export class CommunityValidate {
    constructor() { }

    validatePrimaryDetails(community: Community): any {

        const errors: string[] = [];

        if (!community.Name) {
            errors.push('Name is required.');
        }
        if (community.OrganizationId == 0) {
            errors.push('organization is required.');
        }
        if (!community.StatusId) {
            errors.push('Status is required.');
        }
        if (!community.CommunityTypeId) {
            errors.push('Community type is required.');
        }
        return errors.length > 1 ? ["Please fill all required fields"] : errors;
    }

    validateProperty(communityToPropertyMap: CommunityToPropertyMap): string {

        let error: string = '';

        if (communityToPropertyMap.PropertyId == 0) {
            error = 'Property is required.';
        }
        
        return error;
    }
}
