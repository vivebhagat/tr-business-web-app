import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { LEASE_REQUEST_CONSTANTS } from 'src/app/constants/lease/lease-request-constant';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { LeaseRequestService } from 'src/app/service/lease/lease-request-service';

@Component({
    selector: 'lease-request',
    templateUrl: 'lease-request.component.html',
    styleUrls: ['lease-request.component.css'],
    providers: [LeaseRequestService]
})

export class LeaseRequestComponent implements OnInit {
    sideBarVisible: boolean = true;
    toggle: boolean = false;
    alertMessage: AlertMessage = new AlertMessage;
    leaseRequestList: Array<any> = [];
    leaseRequestListHeaders = LEASE_REQUEST_CONSTANTS.LEASE_REQUEST_LIST_HEADERS;


    @ViewChild('navbar')
    navbar!: TopBarComponent;

    constructor(private spinnerService: NgxSpinnerService,
        private leaseAgreemetService: LeaseRequestService) { }

    ngOnInit() {
        this.getAllProperties();
    }

    setPage(_n: number) {

    }

    range(size: number, count: number) {
        var ret: any = [];
        return ret;
    }

    dismissAlert() {
        this.alertMessage = new AlertMessage;
    }

    getAllProperties() {
        this.dismissAlert();
        this.spinnerService.show();
        this.leaseAgreemetService.getLeaseRequestList().subscribe({
            next: (response) => {
                this.leaseRequestList = response;
                this.spinnerService.hide();
            },
            error: (error) => {
                this.spinnerService.hide();
                this.alertMessage.ErrorMessage = "Error fetching lease requests list";
            }
        });
    }

    formatDate(date: any, type: any): any {
        switch (type) {
            case 'FULL_DATE': return moment(date).format('DD/MM/YYYY hh:mm A');
            case 'DATE_ONLY': return moment(date).format('DD/MM/YYYY');
        }
    }


    toggleNavBar(event: any) {
        this.sideBarVisible = !this.sideBarVisible;
        this.toggle != this.toggle;
    }

    reqeustNavBarToggle($event: any) {
        this.navbar.toggleNavbar();
    }
}