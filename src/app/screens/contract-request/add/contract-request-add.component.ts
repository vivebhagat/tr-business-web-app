import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth/auth-service';
import { AuthData } from 'src/app/model/auth/authData';
import { ContractRequestService } from 'src/app/service/estate/contract-request-service';
import { CreateContractRequest } from 'src/app/model/estate/create-contract-request';
import { ContractRequestHelper } from '../helper/contract-request-helper';
import { CONTRACT_REQUEST_CONSTANTS } from 'src/app/constants/estate/contract-request-constant';
import { GlobalService } from 'src/app/service/global-service/global-service';

@Component({
  selector: 'contract-request-add',
  templateUrl: 'contract-request-add.component.html',
  styleUrls: ['contract-request-add.component.css'],
  providers: [ContractRequestService, AuthService, GlobalService],
})

export class ContractRequestAddComponent implements OnInit {
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
  entityData: CreateContractRequest = new CreateContractRequest;
  modalMessage: string = '';
  isExpanded: boolean = false;
  contractRequestStatusList: Array<any> = [];
  contractRequestHelper: ContractRequestHelper = new ContractRequestHelper;
  authData: AuthData = new AuthData;
  propertyList: Array<any> = [];
  customerList: Array<any> = [];


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private contractRequestService: ContractRequestService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private globalService: GlobalService) {
    this.authData = this.authService.getAuthData()!;
  }

  ngOnInit() {
    this.getPropertyList();
    this.getCustomerList();
    this.getContractRequestStatus();
  }

  dismissAlert() {
    this.alertMessage = new AlertMessage;
    this.modalMessage = '';
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

  add() {
    console.log('add data', this.entityData, this.authData)
    this.dismissAlert();
    this.spinnerService.show();
    this.contractRequestService.addContractRequest(this.entityData).subscribe({
      next: (response) => {
        this.router.navigate(['contractRequest-edit/', response])
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error adding application data.";
      }
    });
  }

  back() {
    this.router.navigate(['my-applications'])
  }

  formatDate(data: any) {

  }
}