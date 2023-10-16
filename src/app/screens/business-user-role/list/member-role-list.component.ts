import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MEMBER_ROLE_CONSTANTS } from 'src/app/constants/team-management/member-role/member-role';
import { MemberRoleHelper } from '../helper/member-role-helper';
import { BusinessUserService } from 'src/app/service/user/businessuser-service';
import { AuthData } from 'src/app/model/auth/authData';
import { AuthService } from 'src/app/service/auth/auth-service';
import { BusinessUserRole } from 'src/app/model/user/business-user-role';
import { BusinessUserRoleService } from 'src/app/service/user/business-user-role-service';
import { CreateBusinessUserRole } from 'src/app/model/user/create-business-user-role';


@Component({
  selector: 'member-role-list',
  templateUrl: 'member-role-list.component.html',
  styleUrls: ['member-role-list.component.css'],
  providers: [BusinessUserRoleService, AuthService]
})

export class MemberRoleListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  memberRoleList: Array<any> = [];
  memberRoleListHeaders = MEMBER_ROLE_CONSTANTS.MEMBER_ROLE_LIST_HEADERS;
  memberRoleHelper: MemberRoleHelper = new MemberRoleHelper;
  authData: AuthData = new AuthData;
  modalVisible: boolean = false;
  action: string = '';
  warnClass: boolean = false;
  modalMessage = '';
  entityData: CreateBusinessUserRole = new CreateBusinessUserRole;
  modelId: number = 0;
  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private businessUserRoleService: BusinessUserRoleService,
    private route: Router) { }

  ngOnInit() {
    this.authData = this.authService.getAuthData()!;
    this.getAllMemberRoles();
  }

  dismissAlert() {
    this.alertMessage = new AlertMessage;
  }

  setPage(_n: number) {

  }

  range(size: number, count: number) {
    var ret: any = [];
    return ret;
  }


  getAllMemberRoles() {
    this.dismissAlert();
    this.spinnerService.show();
    this.businessUserRoleService.getAllBusinessUserRoles().subscribe({
      next: (response) => {
        this.memberRoleList = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching member list";
      }
    });
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
        this.entityData.BusinessUserRole = new BusinessUserRole;
        this.action = 'Add Role';
        break;
      case 'Edit':
        this.action = 'Edit Role';
        if (index != -1) {
          this.entityData.BusinessUserRole = Object.assign({}, this.memberRoleList[index]);
          this.modelId = this.entityData.BusinessUserRole.Id;
        }
        break;
      default:
    }
  }

  add() {
    this.dismissAlert();
    this.spinnerService.show();
    this.businessUserRoleService.addBusinessUserRole(this.entityData).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllMemberRoles();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching member list";
      }
    });
  }

  edit() {
    this.dismissAlert();
    this.spinnerService.show();
    this.businessUserRoleService.editBusinessUserRole(this.entityData).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllMemberRoles();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching member list";
      }
    });
  }

  deleteRole(Id: number) {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    this.dismissAlert();
    this.spinnerService.show();
    this.businessUserRoleService.deleteBusinessUserRole(Id).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllMemberRoles();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching member list";
      }
    });
  }

}