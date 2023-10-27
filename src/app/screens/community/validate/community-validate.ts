import { Community } from "src/app/model/estate/community";


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
        if (!community.Location) {
            errors.push('Location is required.');
        }
        if (!community.StatusId) {
            errors.push('Status is required.');
        }
        if (!community.CommunityTypeId) {
            errors.push('Community type is required.');
        }
        return errors.length > 1 ? ["Please fill all required fields"] : errors;
    }
}
