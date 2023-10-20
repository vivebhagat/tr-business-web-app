import { ContractRequest } from "src/app/model/estate/contract-request";


export class ContarctRequestValidate {
    constructor() { }

    validatePrimaryDetails(contractRequest: ContractRequest): any {

        const errors: string[] = [];

        if (contractRequest.PropertyId == 0) {
            errors.push('Property is required.');
        }
        if (contractRequest.CustomerId == 0) {
            errors.push('Customer is required.');
        }
        if (contractRequest.ProposedPurchasePrice <= 0) {
            errors.push('Proposed purchase price should be positive value.');
        }
        if (contractRequest.Status == 0) {
            errors.push('Status is required.');
        }
        
        return errors.length > 1 ? ["Please fill all required fields"] : errors;
    }
}
