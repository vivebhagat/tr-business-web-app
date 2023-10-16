import { Component, Inject, OnInit, Type, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusinessUserService } from 'src/app/service/user/businessuser-service';
import { GlobalService } from 'src/app/service/global-service/global-service';
import { UpdateBusinessUser } from 'src/app/model/user/update-businessuser';
import { BusinessUserToRoleMap } from 'src/app/model/user/business-user-to-role-map';
import { BUSINESS_USER_CONSTANT } from 'src/app/constants/user/business-user-contant';
import { AuthData } from 'src/app/model/auth/authData';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { BusinessUserValidate } from '../validate/business-user-validate';
import { BusinessUserHelper } from '../helper/business-user-helper';

@Component({
  selector: 'business-user-add',
  styleUrls: ['./business-user-add.component.css'],
  templateUrl: './business-user-add.component.html',
  providers: [GlobalService, BusinessUserService]
})
export class BusinessUserAddComponent implements OnInit {
  sideBarVisible: boolean = true;
  alertMessage: AlertMessage = new AlertMessage;
  toggle: boolean = false;
  organizationList: Array<any> = [];
  action: string = '';
  enableEdit: boolean = false;
  modelIndex: number = 0;
  entityData: UpdateBusinessUser =  new UpdateBusinessUser;
  businessUserToRoleMap: BusinessUserToRoleMap = new BusinessUserToRoleMap;
  roleList: Array<any> = [];
  showModal: boolean = false;
  warnClass: boolean = false;
  currentTab = BUSINESS_USER_CONSTANT.PRIMARY;
  UI_CONSTANT = BUSINESS_USER_CONSTANT;
  authData: AuthData = new AuthData;
  modalMessage: string = '';
  businessUserValidate: BusinessUserValidate = new BusinessUserValidate;
  businessUserHelper: BusinessUserHelper = new BusinessUserHelper;

  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(protected httpClient: HttpClient,
    protected route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private businessUserService: BusinessUserService,
    private spinnerService: NgxSpinnerService) {

  }

  ngOnInit() {
    this.getRoles();
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

  editFormData(tab: string, index: number) {
    let isDuplicate = false;
    switch (tab) {
      case this.UI_CONSTANT.BUSINESS_USER_TO_ROLE_MAP:
        let newRole = Object.assign({}, this.businessUserToRoleMap) as BusinessUserToRoleMap;
        var error = this.businessUserValidate.validateRole(this.businessUserToRoleMap)
        if(error){
          this.modalMessage = error;
          this.resetAlert();
          return;
        }

        isDuplicate = this.businessUserHelper.checkDuplicate(this.entityData.BusinessUserToRoleMapList, tab, newRole, index);
        if (isDuplicate) {
          this.modalMessage = 'Duplicate role found in the list.';
          this.resetAlert();
          return;
        }
        
        this.entityData.BusinessUserToRoleMapList[index] = newRole;
        this.showModal = false;
        break;
      default:
    }
  }

  deleteRow(index: number, tab: string) {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    else {
      switch (tab) {
        case this.UI_CONSTANT.BUSINESS_USER_TO_ROLE_MAP:
          this.entityData.BusinessUserToRoleMapList.splice(index, 1);
          break;
        default:
      }
    }
  };

  formAction(tabaction: string, form: string, data: object, index: number) {
    this.dismissAlert();
    this.showModal = true;
    switch (tabaction) {
      case 'Add':
        this.enableEdit = false;
        switch (form) {
          case this.UI_CONSTANT.BUSINESS_USER_TO_ROLE_MAP:
            this.action = this.UI_CONSTANT.ADD_ROLE;
            this.businessUserToRoleMap = new BusinessUserToRoleMap;
            break;
        }
        break;
      case 'Edit':
        this.enableEdit = true;
        switch (form) {
          case this.UI_CONSTANT.BUSINESS_USER_TO_ROLE_MAP:
            this.action = this.UI_CONSTANT.EDIT_ROLE;
            this.businessUserToRoleMap = Object.assign({}, data) as BusinessUserToRoleMap;
            break;
        }
        this.modelIndex = index;
        break;
    }
  }

  addFormData(tab: string) {
    var isDuplicate = false;
    switch (tab) {
      case this.UI_CONSTANT.BUSINESS_USER_TO_ROLE_MAP:
        let newRole = Object.assign({}, this.businessUserToRoleMap) as BusinessUserToRoleMap;
        var error = this.businessUserValidate.validateRole(this.businessUserToRoleMap)
        if(error){
          this.modalMessage = error;
          this.resetAlert();
          return;
        }

        isDuplicate = this.businessUserHelper.checkDuplicate(this.entityData.BusinessUserToRoleMapList, tab, newRole, null);
        if (isDuplicate) {
          this.modalMessage = 'Duplicate role found in the list.';
          this.resetAlert();
          return;
        }

        this.entityData.BusinessUserToRoleMapList.push(newRole);
        this.showModal = false;
        break;
      default:
    }
  }

  bindDropdowns(name: string) {
    switch (name) {
      case this.UI_CONSTANT.BUSINESS_USER_TO_ROLE_MAP:
        this.roleList.forEach(type => {
          if (type.Id == this.businessUserToRoleMap.RoleId) {
            this.businessUserToRoleMap.Role = type;
          }
        });
        break;
    }
  }

  getRoles() {
    this.dismissAlert();
    this.businessUserService.getAllBusinessuserRoles().subscribe({
      next: (response) => {
        this.roleList = response;
      },
      error: (error) => {
      }
    });
  }

  addMember() {
    var error = this.businessUserValidate.validatePrimaryDetails(this.entityData.BusinessUser)

    if(error.length != 0){
      this.alertMessage.ErrorMessage = error;
      this.resetAlert();
      return;
    }

    this.spinnerService.show();
    this.businessUserService.addBusinessuser(this.entityData)
    .subscribe({
      next: (response) => {
        this.dismissAlert();
        this.router.navigate(['member-edit/' + response]);
        this.spinnerService.hide();      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Failed to add member.";
        this.resetAlert();
      }
    });
  }

  
  getUserName() {
    this.entityData.BusinessUser.UserName = this.entityData.BusinessUser.FirstName + '@demo.com';
  }

  getImageData(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      if (reader.result) {
        this.entityData.BusinessUser.Url = reader.result?.toString();
      }
    }
  }

  deleteImage() {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    else {
        this.entityData.BusinessUser.Url = '';
    }
  }

  Back() {
    this.router.navigate(['member-list']);
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }
}
