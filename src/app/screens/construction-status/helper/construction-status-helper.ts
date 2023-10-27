import { CommunityType } from "src/app/model/estate/community-type";
import { ConstructionStatus } from "src/app/model/estate/construction-status";

export class ConstructionStatusHelper {

    validate(constructionStatus: ConstructionStatus): string | null {
        if (!constructionStatus.Name) {
           return 'Name is required';
        }
        return null;
    }
}