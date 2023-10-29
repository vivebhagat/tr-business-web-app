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
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PropertyStatus } from 'src/app/model/estate/property-status';
import { CommunityToPropertyMap } from 'src/app/model/estate/community-to-propert-map';


@Component({
  selector: 'community-edit',
  styleUrls: ['./community-edit.component.css'],
  templateUrl: './community-edit.component.html',
  providers: [GlobalService, CommunityService],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CommunityEditComponent implements OnInit {
  sideBarVisible: boolean = true;
  alertMessage: AlertMessage = new AlertMessage;
  toggle: boolean = false;
  organizationList: Array<any> = [];
  action: string = '';
  enableEdit: boolean = false;
  modelIndex: number = 0;
  entityData: CreateCommunity = new CreateCommunity;
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
  imageFile: any;
  communityToPropertyMap: CommunityToPropertyMap = new CommunityToPropertyMap;
  propertyList: Array<any> = [];
  communityId: number = 0;

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
    this.getPropertyList();
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
      case this.UI_CONSTANT.PROPERTY:
        let newProperty = Object.assign({}, this.communityToPropertyMap) as CommunityToPropertyMap;
        var error = this.communityValidate.validateProperty(this.communityToPropertyMap)
        if(error){
          this.modalMessage = error;
          this.resetAlert();
          return;
        }

        isDuplicate = this.communityHelper.checkDuplicate(this.entityData.CommunityToPropertyMapList, tab, newProperty, index);
        if (isDuplicate) {
          this.modalMessage = 'Duplicate property found in the list.';
          this.resetAlert();
          return;
        }
        
        this.entityData.CommunityToPropertyMapList[index] = newProperty;
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
        case this.UI_CONSTANT.PROPERTY:
          this.entityData.CommunityToPropertyMapList.splice(index, 1);
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
          case this.UI_CONSTANT.PROPERTY:
            this.action = this.UI_CONSTANT.ADD_PROPERTY;
            this.communityToPropertyMap = new CommunityToPropertyMap;
            break;
        }
        break;
      case 'Edit':
        this.enableEdit = true;
        switch (form) {
           case this.UI_CONSTANT.PROPERTY:
             this.action = this.UI_CONSTANT.EDIT_PROPERTY;
             this.communityToPropertyMap = Object.assign({}, data) as CommunityToPropertyMap;
             break;
        }
        this.modelIndex = index;
        break;
    }
  }

  addFormData(tab: string) {
    var isDuplicate = false;
    switch (tab) {
      case this.UI_CONSTANT.PROPERTY:
        let newProperty = Object.assign({}, this.communityToPropertyMap) as CommunityToPropertyMap;
        var error = this.communityValidate.validateProperty(this.communityToPropertyMap)
        if(error){
          this.modalMessage = error;
          this.resetAlert();
          return;
        }

        isDuplicate = this.communityHelper.checkDuplicate(this.entityData.CommunityToPropertyMapList, tab, newProperty, null);
        if (isDuplicate) {
          this.modalMessage = 'Duplicate property found in the list.';
          this.resetAlert();
          return;
        }

        this.entityData.CommunityToPropertyMapList.push(newProperty);
        this.showModal = false;
        break;
      default:
    }
  }

  bindDropdowns(name: string) {
    switch (name) {
      case this.UI_CONSTANT.PROPERTY:
        this.propertyList.forEach(type => {
          if (type.Id == this.communityToPropertyMap.PropertyId) {
            this.communityToPropertyMap.Property = type;
          }
        });
        break;
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

  
  getPropertyList() {
    this.globalService.getPropertyList().subscribe({
      next: (response) => {
        this.propertyList = response;
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

  editCommunity() {
    var error = this.communityValidate.validatePrimaryDetails(this.entityData.Community)

    if (error.length != 0) {
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
          this.spinnerService.hide();
        },
        error: (error) => {
          this.spinnerService.hide();
          this.alertMessage.ErrorMessage = "Failed to add community.";
          this.resetAlert();
        }
      });
  }

  getPropertyStatusString(enumValue: number): string {
    switch (enumValue) {
      case PropertyStatus.ComingSoon:
        return 'Coming Soon';
      case PropertyStatus.Auction:
        return 'Auction';
      case PropertyStatus.Leased:
        return 'Leased';
      case PropertyStatus.UnderMaintenance:
        return 'Under Maintenance';
      case PropertyStatus.Sold:
        return 'Sold';
      default:
        return 'Unknown';
    }
  }


  getImageData(event: any) {
    this.imageFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      if (reader.result) {
        this.entityData.Community.Url = reader.result?.toString();
      }
    }
  }

  deleteImage() {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    else {
      this.entityData.Community.Url = '';
    }
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
