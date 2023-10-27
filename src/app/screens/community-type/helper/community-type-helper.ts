import { CommunityType } from "src/app/model/estate/community-type";

export class CommunityTypeHelper {

    validate(communityType: CommunityType): string | null {
        if (!communityType.Name) {
           return 'Name is required';
        }
        return null;
    }
}