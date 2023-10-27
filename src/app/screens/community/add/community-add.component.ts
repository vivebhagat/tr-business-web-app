import { Component, Inject, OnInit, Type, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/service/global-service/global-service';
import { AuthData } from 'src/app/model/auth/authData';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { CommunityService } from 'src/app/service/community/community-service';
import { CreateCommunity } from 'src/app/model/estate/create-community';
import { COMMUNITY_CONSTANTS } from 'src/app/constants/estate/community-constant';
import { CommunityValidate } from '../validate/community-validate';
import { CommunityHelper } from '../helper/community-helper';
import { AuthService } from 'src/app/service/auth/auth-service';


@Component({
  selector: 'community-add',
  styleUrls: ['./community-add.component.css'],
  templateUrl: './community-add.component.html',
  providers: [GlobalService, CommunityService]
})
export class CommunityAddComponent implements OnInit {
  sideBarVisible: boolean = true;
  alertMessage: AlertMessage = new AlertMessage;
  toggle: boolean = false;
  organizationList: Array<any> = [];
  action: string = '';
  enableEdit: boolean = false;
  modelIndex: number = 0;
  entityData: CreateCommunity =  new CreateCommunity;
  communityTypeList: Array<any> = [];
  constructionStatusList: Array<any> = [];
  showModal: boolean = false;
  warnClass: boolean = false;
  currentTab = COMMUNITY_CONSTANTS.PRIMARY;
  UI_CONSTANT = COMMUNITY_CONSTANTS;
  authData: AuthData = new AuthData;
  modalMessage: string = '';
  communityValidate: CommunityValidate = new CommunityValidate;
  communityHelper: CommunityHelper = new CommunityHelper;
  isCollapsed: boolean = true;

  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(protected httpClient: HttpClient,
    protected route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private authService: AuthService,
    private communityService: CommunityService,
    private spinnerService: NgxSpinnerService) {

  }

  ngOnInit() {
    this.getCommunityTypes();
    this.getOrgList();
    this.getConstructionStatusList();
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

    toggleOverview() {
    this.isCollapsed = !this.isCollapsed;
  }

   getCollapsibleClass() {
    return this.isCollapsed ? 'collapsible' : 'collapsible active';
  }

  editFormData(tab: string, index: number) {
    let isDuplicate = false;
    switch (tab) {
      /*case this.UI_CONSTANT.COMMUNITY_TO_ROLE_MAP:
        let newRole = Object.assign({}, this.communityToPropertyMap) as CommunityToPropertyMap;
        var error = this.communityValidate.validateRole(this.communityToPropertyMap)
        if(error){
          this.modalMessage = error;
          this.resetAlert();
          return;
        }

        isDuplicate = this.communityHelper.checkDuplicate(this.entityData.CommunityToPropertyMapList, tab, newRole, index);
        if (isDuplicate) {
          this.modalMessage = 'Duplicate role found in the list.';
          this.resetAlert();
          return;
        }
        
        this.entityData.CommunityToPropertyMapList[index] = newRole;
        this.showModal = false;
        break;
      default:*/
    }
  }

  deleteRow(index: number, tab: string) {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    else {
      switch (tab) {
        /*case this.UI_CONSTANT.COMMUNITY_TO_ROLE_MAP:
          this.entityData.CommunityToPropertyMapList.splice(index, 1);
          break;
        default:*/
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
          /*case this.UI_CONSTANT.COMMUNITY_TO_ROLE_MAP:
            this.action = this.UI_CONSTANT.ADD_ROLE;
            this.communityToPropertyMap = new CommunityToPropertyMap;
            break;*/
        }
        break;
      case 'Edit':
        this.enableEdit = true;
        switch (form) {
         /* case this.UI_CONSTANT.COMMUNITY_TO_ROLE_MAP:
            this.action = this.UI_CONSTANT.EDIT_ROLE;
            this.communityToPropertyMap = Object.assign({}, data) as CommunityToPropertyMap;
            break;*/
        }
        this.modelIndex = index;
        break;
    }
  }

  addFormData(tab: string) {
    var isDuplicate = false;
    switch (tab) {
      /*case this.UI_CONSTANT.COMMUNITY_TO_ROLE_MAP:
        let newRole = Object.assign({}, this.communityToPropertyMap) as CommunityToPropertyMap;
        var error = this.communityValidate.validateRole(this.communityToPropertyMap)
        if(error){
          this.modalMessage = error;
          this.resetAlert();
          return;
        }

        isDuplicate = this.communityHelper.checkDuplicate(this.entityData.CommunityToPropertyMapList, tab, newRole, null);
        if (isDuplicate) {
          this.modalMessage = 'Duplicate role found in the list.';
          this.resetAlert();
          return;
        }

        this.entityData.CommunityToPropertyMapList.push(newRole);
        this.showModal = false;
        break;
      default:*/
    }
  }

  bindDropdowns(name: string) {
    switch (name) {
      /*case this.UI_CONSTANT.COMMUNITY_TO_ROLE_MAP:
        this.roleList.forEach(type => {
          if (type.Id == this.communityToPropertyMap.RoleId) {
            this.communityToPropertyMap.Role = type;
          }
        });
        break;*/
    }
  }

  getCommunityTypes() {
    this.globalService.getAllCommunityTypes().subscribe({
      next: (response) => {
        this.communityTypeList = response;
      },
      error: (error) => {
      }
    });
  }

  getOrgList() {
    this.authService.getAllOrganizations().subscribe({
      next: (response) => {
        this.organizationList = response;
      },
      error: (error) => {
      }
    });
  }

  getConstructionStatusList() {
    this.globalService.getAllConstructionStatus().subscribe({
      next: (response) => {
        this.constructionStatusList = response;
      },
      error: (error) => {
      }
    });
  }

  addCommunity() {
    var error = this.communityValidate.validatePrimaryDetails(this.entityData.Community)

    if(error.length != 0){
      this.alertMessage.ErrorMessage = error;
      this.resetAlert();
      return;
    }

    this.spinnerService.show();
    this.communityService.addCommunity(this.entityData)
    .subscribe({
      next: (response) => {
        this.dismissAlert();
        this.router.navigate(['community-edit/' + response]);
        this.spinnerService.hide();      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Failed to add community.";
        this.resetAlert();
      }
    });
  }

  Back() {
    this.router.navigate(['community-list']);
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }
}
