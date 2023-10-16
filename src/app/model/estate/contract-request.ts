export class ContractRequest {
    Id: number = 0;
    PropertyId: number = 0;
    Property: any;
    CustomerId: number = 0;
    Customer: any;
    Status: number = 0;
    ProposedPurchasePrice: number = 0;
    Note: string = '';
    IsApproved: boolean = false;
    ApprovalDate: string = '';
    CreatedDate: string = '';
}
