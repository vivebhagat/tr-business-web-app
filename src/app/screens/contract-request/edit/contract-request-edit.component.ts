import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth/auth-service';
import { AuthData } from 'src/app/model/auth/authData';
import { ContractRequestService } from 'src/app/service/estate/contract-request-service';
import { CreateContractRequest } from 'src/app/model/estate/create-contract-request';
import { ContractRequestHelper } from '../helper/contract-request-helper';
import { CONTRACT_REQUEST_CONSTANTS } from 'src/app/constants/estate/contract-request-constant';
import { GlobalService } from 'src/app/service/global-service/global-service';
import { UpdateContractRequest } from 'src/app/model/estate/update-contract-request';
import { ContarctRequestValidate } from '../validate/contract-request-validate';

@Component({
  selector: 'contract-request-edit',
  templateUrl: 'contract-request-edit.component.html',
  styleUrls: ['contract-request-edit.component.css'],
  providers: [ContractRequestService, AuthService, GlobalService],
})

export class ContractRequestEditComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  showModal: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  warnClass: boolean = false;
  currentTab: string = 'PRIMARY';
  action: string = '';
  enableEdit: boolean = false;
  modelIndex: number = 0;
  tabs = CONTRACT_REQUEST_CONSTANTS.CONTRACT_REQUEST_TABS;
  contractRequestConstant = CONTRACT_REQUEST_CONSTANTS;
  entityData: UpdateContractRequest = new UpdateContractRequest;
  modalMessage: string = '';
  isExpanded: boolean = false;
  contractRequestStatusList: Array<any> = [];
  contractRequestHelper: ContractRequestHelper = new ContractRequestHelper;
  contractRequestValidate: ContarctRequestValidate = new ContarctRequestValidate;
  authData: AuthData = new AuthData;
  propertyList: Array<any> = [];
  customerList: Array<any> = [];
  contactRequestId: number = 0;


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private contractRequestService: ContractRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private globalService: GlobalService) {
    this.authData = this.authService.getAuthData()!;
  }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.contactRequestId = params['id'];
    });
    this.getPropertyList();
    this.getCustomerList();
    this.getContractRequestStatus();
    this.getContractRequest();

  }

  dismissAlert() {
    this.alertMessage = new AlertMessage;
    this.modalMessage = '';
  }

  resetAlert() {
    this.warnClass = true;
    setTimeout(() => {
      this.warnClass = false;
    }, 1000)
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }

  setContractRequestStatus(status: any): string {
    return this.contractRequestHelper.getContractRequestStatusString(Number(status));
  }

  getContractRequestStatus() {
    this.contractRequestService.getContractRequestStatusList().subscribe({
      next: (response) => {
        this.contractRequestStatusList = response;
      },
      error: (error) => {
      }
    });
  }

  getPropertyList() {
    this.globalService.getPropertyList().subscribe({
      next: (response) => {
        this.propertyList = response;
      },
      error: (error) => {
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

  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  delete() {

  }

  getContractRequest() {
    this.dismissAlert();
    this.spinnerService.show();
    this.contractRequestService.getContractRequest(this.contactRequestId).subscribe({
      next: (response) => {
        this.entityData.ContractRequest = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Failed to get application list.";
      }
    });
  }


  edit() {
    this.dismissAlert();
    var error = this.contractRequestValidate.validatePrimaryDetails(this.entityData.ContractRequest)

    if(error.length != 0){
      this.alertMessage.ErrorMessage = error;
      this.resetAlert();
      return;
    } 

    this.spinnerService.show();
    this.contractRequestService.editContractRequest(this.entityData).subscribe({
      next: (response) => {
        this.entityData.ContractRequest = response;
        this.alertMessage.SuccessMessage = "Application edited successfully.";
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error editing application data.";
      }
    });
  }

  back() {
    this.router.navigate(['applications'])
  }

  formatDate(data: any) {

  }
}