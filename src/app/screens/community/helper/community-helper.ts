import { COMMUNITY_CONSTANTS } from "src/app/constants/estate/community-constant";
import { BUSINESS_USER_CONSTANT } from "src/app/constants/user/business-user-contant";

export class CommunityHelper {
        
    checkDuplicate(list: Array<any>, tab: string, item: any, index: any): boolean {
        switch (tab) {
            case COMMUNITY_CONSTANTS.PROPERTY:
                return list.filter((currentValue) =>
                    list.indexOf(currentValue) != index && currentValue.PropertyId == item.PropertyId).length > 0;
        }
        return false;
    }
}