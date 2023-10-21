import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AuthData } from 'src/app/model/auth/authData';
import { AuthService } from 'src/app/service/auth/auth-service';
import { ORG_CONSTANTS } from 'src/app/constants/setup/org-constant';
import { UpdateOrganization } from 'src/app/model/setup/update-organization';
import { Organization } from 'src/app/model/setup/organization';



@Component({
  selector: 'org-list',
  templateUrl: 'org-list.component.html',
  styleUrls: ['org-list.component.css'],
  providers: [AuthService]
})

export class OrganizationListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  organizationList: Array<any> = [];
  organizationListHeaders = ORG_CONSTANTS.ORG_LIST_HEADERS;
  authData: AuthData = new AuthData;
  modalVisible: boolean = false;
  action: string = '';
  warnClass: boolean = false;
  modalMessage = '';
  entityData: UpdateOrganization = new UpdateOrganization;
  modelId: number = 0;
  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
    this.authData = this.authService.getAuthData()!;
    this.getAllOrganizations();
  }

  dismissAlert() {
    this.alertMessage = new AlertMessage;
    this.modalMessage = '';
  }

  setPage(_n: number) {

  }

  range(size: number, count: number) {
    var ret: any = [];
    return ret;
  }


  getAllOrganizations() {
    this.dismissAlert();
    this.spinnerService.show();
    this.authService.getAllOrganizations().subscribe({
      next: (response) => {
        this.organizationList = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching organization details.";
      }
    });
  }

  goToEdit(Id: number) {
    this.route.navigate(['organization-edit/' + Id],);
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }

  showModal(index: number, type: string) {
    this.dismissAlert();
    this.modalVisible = true;
    switch (type) {
      case 'Add':
        this.entityData.Organization = new Organization;
        this.action = 'Add Organization';
        break;
      case 'Edit':
        this.action = 'Edit Organization';
        if (index != -1) {
          this.entityData.Organization = Object.assign({}, this.organizationList[index]);
          this.modelId = this.entityData.Organization.Id;
        }
        break;
      default:
    }
  }

  add(){

  }

  edit() {
    this.dismissAlert();
    this.spinnerService.show();
    this.authService.editOrganization(this.entityData).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllOrganizations();
        this.modalVisible = false;
      },
      error: (error) => {
        this.spinnerService.hide();
        this.modalMessage = "Error updating organization details.";
      }
    });
  }
}