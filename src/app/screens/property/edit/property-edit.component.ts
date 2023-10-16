import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { PROPERTY_CONSTANTS } from 'src/app/constants/estate/property-constants';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { PropertyService } from 'src/app/service/estate/property-service';
import { PropertyHelper } from '../helper/property-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthData } from 'src/app/model/auth/authData';
import { CreateProperty } from 'src/app/model/estate/Dto/create-property';
import { PropertyImage } from 'src/app/model/estate/Dto/propert-image';
import { PropertyValidate } from '../validate/property-validate';

@Component({
  selector: 'property-edit',
  templateUrl: 'property-edit.component.html',
  styleUrls: ['property-edit.component.css'],
  providers: [PropertyService],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})

export class PropertyEditComponent implements OnInit {
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
  propertyId: number = 0;
  authData: AuthData = new AuthData;
  imageFile: any;
  showImagePreview = false;
  selectedImage: any;
  imageList: Array<any> = [];
  propertyValidate: PropertyValidate = new PropertyValidate;


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private propertyService: PropertyService,
    protected route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.propertyId = params['id'];
      });
    this.getPropertyType();
    this.getPropertyStatus();
    this.getProperty();
    this.getPropertyImageList();
  }

  getProperty() {
    this.dismissAlert();
    this.spinnerService.show();
    this.propertyService.getProperty(this.propertyId).subscribe({
      next: (response) => {
        this.entityData = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching property details.";
      }
    });
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

  edit() {
    var error = this.propertyValidate.validatePrimaryDetails(this.entityData.Property)

    if(error.length != 0){
      this.alertMessage.ErrorMessage = error;
      this.resetAlert();
      return;
    } 

    this.dismissAlert();
    this.spinnerService.show();
    const jsonString = JSON.stringify(this.entityData);
    const formData = new FormData();
    formData.append('ModelString', jsonString);
    formData.append('file', this.imageFile);
    this.propertyService.editProperty(formData).subscribe({
      next: (response) => {
        this.getProperty();
        this.spinnerService.hide();
        this.alertMessage.SuccessMessage = "Property update successfully."
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error updating property data.";
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

  getPropertyImageList() {
    this.dismissAlert();
    this.spinnerService.show();
    this.propertyService.getPropertyImageList(this.propertyId).subscribe({
      next: (response) => {
        this.imageList = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }

  uploadImage(event: any) {
    this.imageFile = event.target.files[0];
    this.spinnerService.show();

    var data = {
      Name: this.imageFile.name,
      Id: this.propertyId
    }
    const jsonString = JSON.stringify(data);
    const formData = new FormData();
    formData.append('modelstring', jsonString);
    formData.append('file', this.imageFile);
    this.propertyService.uploadPropertyImage(formData).subscribe({
      next: (response) => {
        this.getPropertyImageList();
        this.spinnerService.hide();
        this.alertMessage.SuccessMessage = "Image uploaded successfully."
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error updating property image.";
      }
    });
  }

  imagePreview(image: PropertyImage) {
    this.selectedImage = image;
    this.showImagePreview = true;
  }

  getImageData(event: any) {
    this.imageFile = event.target.files[0];
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

  deleteImageFile(Id: number){
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    
    this.dismissAlert();
    this.spinnerService.show();
    this.propertyService.deleteImageFile(Id).subscribe({
      next: (response) => {
        this.getPropertyImageList();
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Failed to delete image file."
      }
    });
  }

}