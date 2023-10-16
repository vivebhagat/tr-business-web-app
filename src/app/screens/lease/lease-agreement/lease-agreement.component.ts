import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { LEASE_AGREEMENT_CONSTANTS } from 'src/app/constants/lease/lease-agreement-contants';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { LeaseAgreementService } from 'src/app/service/lease/lease-agreement-service';

@Component({
    selector: 'lease-agreement',
    templateUrl: 'lease-agreement.component.html',
    styleUrls: ['lease-agreement.component.css'],
    providers: [LeaseAgreementService]
})

export class LeaseAgreementComponent implements OnInit {
    sideBarVisible: boolean = true;
    toggle: boolean = false;
    alertMessage: AlertMessage = new AlertMessage;
    leaseAgreementList: Array<any> = [];
    leaseAgreementListHeaders = LEASE_AGREEMENT_CONSTANTS.LEASE_AGREEMENT_LIST_HEADERS;


    @ViewChild('navbar')
    navbar!: TopBarComponent;

    constructor(private spinnerService: NgxSpinnerService,
        private leaseAgreemetService: LeaseAgreementService) { }

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
        this.leaseAgreemetService.getLeaseAgreementList().subscribe({
            next: (response) => {
                this.leaseAgreementList = response;
                this.spinnerService.hide();
            },
            error: (error) => {
                this.spinnerService.hide();
                this.alertMessage.ErrorMessage = "Error fetching lease agreements list";
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