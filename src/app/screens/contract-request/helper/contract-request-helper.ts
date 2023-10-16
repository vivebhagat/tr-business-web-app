import { ContractRequestStatus } from "src/app/model/estate/contract-request-status";

export class ContractRequestHelper {

    getStatusColor(enumValue: number): string {
        switch (enumValue) {
          case ContractRequestStatus.Applied:
            return 'c-pill c-pill--info';
          case ContractRequestStatus.Rejected:
            return 'c-pill c-pill--danger';
          case ContractRequestStatus.Approved:
            return 'c-pill c-pill--success';
          case ContractRequestStatus.Closed:
            return 'c-pill c-pill--warning';
            case ContractRequestStatus.Withdraw:
              return 'c-pill c-pill--warning';
          default:
            return '';
        }
      }

    getContractRequestStatusString(enumValue: number): string {
        switch (enumValue) {
            case ContractRequestStatus.Applied:
                return 'Applied';
            case ContractRequestStatus.Rejected:
                return 'Rejected';
            case ContractRequestStatus.Approved:
                return 'Approved';
            case ContractRequestStatus.Closed:
                return 'Closed';
                case ContractRequestStatus.Withdraw:
                  return 'Withdraw';
            default:
                return '';
        }
    }
}