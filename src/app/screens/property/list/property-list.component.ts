import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { PROPERTY_CONSTANTS } from 'src/app/constants/estate/property-constants';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { PropertyService } from 'src/app/service/estate/property-service';
import { CurrencyPipe } from '@angular/common';
import { PropertyHelper } from '../helper/property-helper';
import { Router } from '@angular/router';


@Component({
  selector: 'property-list',
  templateUrl: 'property-list.component.html',
  styleUrls: ['property-list.component.css'],
  providers: [PropertyService]
})

export class PropertyListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  propertyList: Array<any> = [];
  propertyListHeaders = PROPERTY_CONSTANTS.PROPERTY_LIST_HEADERS;
  propertyHelper: PropertyHelper = new PropertyHelper;


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private propertyService: PropertyService,
    private route: Router) { }

  ngOnInit() {
    this.getAllProperties();
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

  getAllProperties() {
    this.dismissAlert();
    this.spinnerService.show();
    this.propertyService.getPropertyList().subscribe({
      next: (response) => {
        console.log("all prop", response)
        this.propertyList = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        console.log("all prop", error)
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching property list";
      }
    });
  }

  getAllFeaturedProperties() {
    this.dismissAlert();
    this.spinnerService.show();
    this.propertyService.getFeaturedPropertyList().subscribe({
      next: (response) => {
        this.propertyList = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error fetching property list";
      }
    });
  }

  toggleList(type: string) {
    switch (type) {
      case 'Latest':
        this.getAllProperties();
        break;
      case 'Featured':
        this.getAllFeaturedProperties();
        break;
    }
  }

  delete(Id: number) {
    const confirmDelete = confirm("Are you sure you want to delete this property?");

    if (!confirmDelete) {
      return;
    }

    this.dismissAlert();
    this.spinnerService.show();
    this.propertyService.deleteProperty(Id).subscribe({
      next: (response) => {
        this.getAllProperties();
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error deleting property.";
      }
    });
  }

  setPropertyStatus(status: any): string {
    return this.propertyHelper.getPropertyStatusString(status);
  }

  setPropertyType(type: any): string {
    return this.propertyHelper.getPropertyTypeString(type);
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }

  add() {
    this.route.navigate(['property-add']);
  }

  goToEdit(Id: number) {
    this.route.navigate(['property-edit/' + Id],);
  }
}