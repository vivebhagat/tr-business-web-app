import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { PROPERTY_CONSTANTS } from 'src/app/constants/estate/property-constants';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { PropertyService } from 'src/app/service/estate/property-service';
import { PropertyHelper } from '../helper/property-helper';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth/auth-service';
import { AuthData } from 'src/app/model/auth/authData';
import { CreateProperty } from 'src/app/model/estate/Dto/create-property';
import { PropertyImage } from 'src/app/model/estate/Dto/propert-image';
import { PropertyValidate } from '../validate/property-validate';

@Component({
  selector: 'property-add',
  templateUrl: 'property-add.component.html',
  styleUrls: ['property-add.component.css'],
  providers: [PropertyService, AuthService],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})

export class PropertyAddComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  showModal: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  warnClass: boolean = false;
  currentTab: string = 'PRIMARY';
  action: string = '';
  enableEdit: boolean = false;
  modelIndex: number = 0;
  tabs = PROPERTY_CONSTANTS.PROPERTY_TABS;
  propertyConstant = PROPERTY_CONSTANTS;
  entityData: CreateProperty = new CreateProperty;
  modalMessage: string = '';
  isExpanded: boolean = false;
  propertyTypeList: Array<any> = [];
  propertyStatusList: Array<any> = [];
  propertyHelper: PropertyHelper = new PropertyHelper;
  authData: AuthData = new AuthData;
  propertyValidate: PropertyValidate = new PropertyValidate;
  propertyManagerList: Array<any> = [];
  showUnitTypeInput: boolean = true;

  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private propertyService: PropertyService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService) {
    this.authData = this.authService.getAuthData()!;
  }

  ngOnInit() {
    this.getPropertyType();
    this.getPropertyStatus();
    this.getProeprtyManagerList();
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


  getPropertyType() {
    this.propertyService.getPropertyTypeList().subscribe({
      next: (response) => {
        this.propertyTypeList = response;
      },
      error: (error) => {
      }
    });
  }

  getProeprtyManagerList() {
    this.propertyService.getPropertyManagerList().subscribe({
      next: (response) => {
        this.propertyManagerList = response;
      },
      error: (error) => {
      }
    });
  }

  setPropertyStatus(status: any): string {
    return this.propertyHelper.getPropertyStatusString(Number(status));
  }

  setPropertyType(type: any): string {
    return this.propertyHelper.getPropertyTypeString(Number(type));
  }


  getPropertyStatus() {
    this.propertyService.getPropertyStatusList().subscribe({
      next: (response) => {
        this.propertyStatusList = response;
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

  continue(){
    if(!this.entityData.Property.UnitType){
      this.modalMessage = "Unit type is required."
      this.resetAlert();
      return;
    }
    this.showUnitTypeInput = false;
  }

  formAction(tabAction: string, tab: string, data: object, index: number) {
    this.dismissAlert();
    this.showModal = true;
    this.enableEdit = tabAction === 'Edit';
    switch (tabAction) {
      case 'Add':
        switch (tab) {
          case this.propertyConstant.PROPERTY_IMAGES:
            this.action = this.propertyConstant.ADD_PROPERTY_IMAGE;
            break;
        }
        break;
      case 'Edit':
        switch (tab) {
          case this.propertyConstant.PROPERTY_IMAGES:
            this.action = this.propertyConstant.EDIT_PROPERTY_IMAGE;
            break;
        }
        this.modelIndex = index;
        break;
    }
  }

  add() {
    this.dismissAlert();
    var error = this.propertyValidate.validatePrimaryDetails(this.entityData.Property)

    if (error.length != 0) {
      this.alertMessage.ErrorMessage = error;
      this.resetAlert();
      return;
    }

    this.spinnerService.show();
    this.propertyService.addProperty(this.entityData).subscribe({
      next: (response) => {
        this.router.navigate(['property-edit/', response])
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error adding property data.";
      }
    });
  }

  back() {
    this.router.navigate(['property-list'])
  }

  addFormData(tab: string) {

  }

  editFormData(tab: string, index: number) {

  }

  formatDate(data: any) {

  }

  getImageData(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      if (reader.result) {
        this.entityData.Property.Url = reader.result?.toString();
      }
    }
  }

  deleteImage() {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    else {
      this.entityData.Property.Url = '';
    }
  }
}
