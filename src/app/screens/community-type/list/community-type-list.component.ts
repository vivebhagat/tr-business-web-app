import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AuthData } from 'src/app/model/auth/authData';
import { AuthService } from 'src/app/service/auth/auth-service';
import { CommunityTypeService } from 'src/app/service/community-type/community-type-service';
import { CreateCommunityType } from 'src/app/model/estate/create-community-type';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommunityType } from 'src/app/model/estate/community-type';
import { CommunityTypeHelper } from '../helper/community-type-helper';


@Component({
  selector: 'community-type-list',
  templateUrl: 'community-type-list.component.html',
  styleUrls: ['community-type-list.component.css'],
  providers: [CommunityTypeService, AuthService]
})

export class CommunityTypeListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  communityTypeList: Array<any> = [];
  authData: AuthData = new AuthData;
  modalVisible: boolean = false;
  action: string = '';
  warnClass: boolean = false;
  modalMessage = '';
  entityData: CreateCommunityType = new CreateCommunityType;
  modelId: number = 0;
  communityTypeHelper: CommunityTypeHelper = new CommunityTypeHelper

  
  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private communityTypeService: CommunityTypeService,
    private route: Router) { }

  ngOnInit() {
    this.authData = this.authService.getAuthData()!;
    this.getAllCommunityType();
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

  setPage(_n: number) {

  }

  range(size: number, count: number) {
    var ret: any = [];
    return ret;
  }


  getAllCommunityType() {
    this.dismissAlert();
    this.spinnerService.show();
    this.communityTypeService.getAllCommunityTypes().subscribe({
      next: (response) => {
        this.communityTypeList = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
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
        this.modelId = 0;
        this.entityData.CommunityType = new CommunityType;
        this.action = 'Add Community Type';
        break;
      case 'Edit':
        this.action = 'Edit Community Type';
        if (index != -1) {
          this.entityData.CommunityType = Object.assign({}, this.communityTypeList[index]);
          this.modelId = this.entityData.CommunityType.Id;
        }
        break;
      default:
    }
  }

  add() {
    let error = null;
    error = this.communityTypeHelper.validate(this.entityData.CommunityType);

    if(error!= null)
    {
      this.modalMessage = error;
      this.resetAlert();
      return;
    }

    this.dismissAlert();
    this.spinnerService.show();
    this.communityTypeService.addCommunityType(this.entityData).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllCommunityType();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "There was an error creating community type.";
      }
    });
  }

  edit() {
    console.log(this.modelId)
    let error = null;
    error = this.communityTypeHelper.validate(this.entityData.CommunityType);

    if(error!= null)
    {
      this.modalMessage = error;
      this.resetAlert();
      return;
    }

    this.dismissAlert();
    this.spinnerService.show();
    this.communityTypeService.editCommunityType(this.entityData).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllCommunityType();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "There was an error updating community type";
      }
    });
  }

  deleteCommunityType(Id: number) {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    this.dismissAlert();
    this.spinnerService.show();
    this.communityTypeService.deleteCommunityType(Id).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllCommunityType();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }

}