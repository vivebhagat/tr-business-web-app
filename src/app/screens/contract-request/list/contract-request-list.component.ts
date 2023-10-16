import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { CONTRACT_REQUEST_CONSTANTS } from 'src/app/constants/estate/contract-request-constant';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { ContractRequestService } from 'src/app/service/estate/contract-request-service';
import { ContractRequestHelper } from '../helper/contract-request-helper';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global-service/global-service';

@Component({
    selector: 'contract-request-list',
    templateUrl: 'contract-request-list.component.html',
    styleUrls: ['contract-request-list.component.css'],
    providers: [ContractRequestService, GlobalService]
})

export class ContractRequestListComponent implements OnInit {
    sideBarVisible: boolean = true;
    toggle: boolean = false;
    alertMessage: AlertMessage = new AlertMessage;
    contractRequestList: Array<any> = [];
    contractRequestListHeaders = CONTRACT_REQUEST_CONSTANTS.CONTRACT_RQUEST_HEADERS;
    contractRequestHelper: ContractRequestHelper = new ContractRequestHelper;
    customerList: Array<any> = [];


    @ViewChild('navbar')
    navbar!: TopBarComponent;

    constructor(private spinnerService: NgxSpinnerService,
        private contractRequestService: ContractRequestService,
        private router: Router,
        private globalService: GlobalService) { }

    ngOnInit() {
        this.getCustomerList();
        this.getAllProperties();
    }

    add(){
        this.router.navigate(['contract-request-add']);
    }

    edit(Id: number){
        this.router.navigate(['contract-request-edit/' + Id ]);
    }

    setPage(_n: number) {

    }

    range(size: number, count: number) {
        var ret: any = [];
        return ret;
    }

    dismissAlert() {
        this.alertMessage = new AlertMessage;
    }

    delete(Id: number) {
        const confirmDelete = confirm("Are you sure you want to delete this property?");
    
        if (!confirmDelete) {
          return;
        }
    
        this.dismissAlert();
        this.spinnerService.show();
        this.contractRequestService.deleteContractRequest(Id).subscribe({
          next: (response) => {
            this.getAllProperties();
            this.spinnerService.hide();
          },
          error: (error) => {
            this.spinnerService.hide();
            this.alertMessage.ErrorMessage = "Error deleting application.";
          }
        });
      }

      getCustomerList() {
        this.globalService.getCustomerList().subscribe({
          next: (response) => {
            this.customerList = response;
          },
          error: (error) => {
          }
        });
      }

      setCustomerName(Id: number): string | undefined{
        const customer = this.customerList.find(m => m.Id === Id);
        return customer ? customer.FirstName + ' ' + customer.LastName : undefined;
      }
    

    getAllProperties() {
        this.dismissAlert();
        this.spinnerService.show();
        this.contractRequestService.getContractRequestList().subscribe({
            next: (response) => {
                this.contractRequestList = response;
                this.spinnerService.hide();
            },
            error: (error) => {
                this.spinnerService.hide();
                this.alertMessage.ErrorMessage = "Error fetching contract requests list";
            }
        });
    }

    formatDate(date: any, type: any): any {
        switch (type) {
            case 'FULL_DATE': return moment(date).format('DD/MM/YYYY hh:mm A');
            case 'DATE_ONLY': return moment(date).format('DD/MM/YYYY');
        }
    }

    getStatusColor(type: any): string {
      return this.contractRequestHelper.getStatusColor(type);
  }


    setContractRequestStatus(type: any): string {
        return this.contractRequestHelper.getContractRequestStatusString(type);
    }


    toggleNavBar(event: any) {
        this.sideBarVisible = !this.sideBarVisible;
        this.toggle != this.toggle;
    }

    reqeustNavBarToggle($event: any) {
        this.navbar.toggleNavbar();
    }
}