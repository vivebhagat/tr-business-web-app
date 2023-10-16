import { BUSINESS_USER_CONSTANT } from "src/app/constants/user/business-user-contant";

export class BusinessUserHelper {

    public sampleMembers = [
        {
            Id:1,
            FirstName: 'Mason',
            LastName: 'Herald',
            UserName: 'Mason.Herald',
            Email: 'Mason@demo.com'
        },
        {
            Id:2,
            FirstName: 'Alice',
            LastName: 'Smith',
            UserName: 'Alice.Smith',
            Email: 'Alice@demo.com'
        },
        {
            Id:3,
            FirstName: 'Bob',
            LastName: 'Johnson',
            UserName: 'Bob.Johnson',
            Email: 'Bob@demo.com'
        }
    ];
    

    public checkDuplicate(list: Array<any>, tab: string, item: any, index: any): boolean {
        switch (tab) {
            case BUSINESS_USER_CONSTANT.BUSINESS_USER_TO_ROLE_MAP:
                return list.filter((currentValue) =>
                    list.indexOf(currentValue) != index && currentValue.RoleId == item.RoleId).length > 0;
        }
        return true;
    }

}