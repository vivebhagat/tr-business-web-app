import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AuthData } from 'src/app/model/auth/authData';
import { AuthService } from 'src/app/service/auth/auth-service';
import { ConstructionStatusService } from 'src/app/service/construction-status/construction-status-service';
import { CreateConstructionStatus } from 'src/app/model/estate/create-construction-status';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstructionStatus } from 'src/app/model/estate/construction-status';
import { ConstructionStatusHelper } from '../helper/construction-status-helper';


@Component({
  selector: 'construction-status-list',
  templateUrl: 'construction-status-list.component.html',
  styleUrls: ['construction-status-list.component.css'],
  providers: [ConstructionStatusService, AuthService]
})

export class ConstructionStatusListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  constructionStatusList: Array<any> = [];
  authData: AuthData = new AuthData;
  modalVisible: boolean = false;
  action: string = '';
  warnClass: boolean = false;
  modalMessage = '';
  entityData: CreateConstructionStatus = new CreateConstructionStatus;
  modelId: number = 0;
  constructionStatusHelper: ConstructionStatusHelper = new ConstructionStatusHelper

  
  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private constructionStatusService: ConstructionStatusService,
    private route: Router) { }

  ngOnInit() {
    this.authData = this.authService.getAuthData()!;
    this.getAllConstructionStatus();
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


  getAllConstructionStatus() {
    this.dismissAlert();
    this.spinnerService.show();
    this.constructionStatusService.getAllConstructionStatus().subscribe({
      next: (response) => {
        this.constructionStatusList = response;
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
        this.entityData.ConstructionStatus = new ConstructionStatus;
        this.action = 'Add Construction Status';
        break;
      case 'Edit':
        this.action = 'Edit Construction Status';
        if (index != -1) {
          this.entityData.ConstructionStatus = Object.assign({}, this.constructionStatusList[index]);
          this.modelId = this.entityData.ConstructionStatus.Id;
        }
        break;
      default:
    }
  }

  add() {
    let error = null;
    error = this.constructionStatusHelper.validate(this.entityData.ConstructionStatus);

    if(error!= null)
    {
      this.modalMessage = error;
      this.resetAlert();
      return;
    }

    this.dismissAlert();
    this.spinnerService.show();
    this.constructionStatusService.addConstructionStatus(this.entityData).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllConstructionStatus();
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
    error = this.constructionStatusHelper.validate(this.entityData.ConstructionStatus);

    if(error!= null)
    {
      this.modalMessage = error;
      this.resetAlert();
      return;
    }

    this.dismissAlert();
    this.spinnerService.show();
    this.constructionStatusService.editConstructionStatus(this.entityData).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllConstructionStatus();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "There was an error updating community type";
      }
    });
  }

  deleteConstructionStatus(Id: number) {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    this.dismissAlert();
    this.spinnerService.show();
    this.constructionStatusService.deleteConstructionStatus(Id).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        this.getAllConstructionStatus();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }

}