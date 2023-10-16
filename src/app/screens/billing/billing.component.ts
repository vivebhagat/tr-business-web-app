import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

const PaymentHistory = [
    {
        "Amount": 1000,
        "Status": "Completed",
        "Recipient": "ABC Ltd.",
        "Date": "15/09/2023",
        "PaymentMethod": "Credit Card"
    },
    {
        "Amount": 750,
        "Status": "Pending",
        "Recipient": "ABC Ltd.",
        "Date": "14/09/2023",
        "PaymentMethod": "PayPal"
    },
    {
        "Amount": 1200,
        "Status": "Failed",
        "Recipient": "ABC Ltd.",
        "Date": "12/09/2023",
        "PaymentMethod": "Bank Transfer"
    },
    {
        "Amount": 1200,
        "Status": "Processed",
        "Recipient": "ABC Ltd.",
        "Date": "12/09/2023",
        "PaymentMethod": "Bank Transfer"
    },
]

@Component({
    selector: 'billing',
    templateUrl: 'billing.component.html',
    styleUrls: ['billing.component.css']
})

export class BillingComponent implements OnInit {
    sideBarVisible: boolean = true;
    toggle: boolean = false;
    alertMessage: AlertMessage = new AlertMessage;
    paymentHistory: Array<any> = [];


    @ViewChild('navbar')
    navbar!: TopBarComponent;

    constructor(private spinnerService: NgxSpinnerService) { }

    ngOnInit() {
        this.spinnerService.show();
        setTimeout(() => {
            this.spinnerService.hide();
            this.paymentHistory = PaymentHistory;
        }, 1000)

    }

    toggleNavBar(event: any) {
        this.sideBarVisible = !this.sideBarVisible;
        this.toggle != this.toggle;
    }

    reqeustNavBarToggle($event: any) {
        this.navbar.toggleNavbar();

    }

    getStatusColor(type: any): string {
        switch (type) {
          case 'Processed':
            return 'c-pill c-pill--info c-pill-text-info';
          case 'Failed':
            return 'c-pill c-pill--danger c-pill-text-danger';
          case 'Completed':
            return 'c-pill c-pill--success c-pill-text-success';
          case 'Pending':
            return 'c-pill c-pill--warning c-pill-text-warning';
          default:
            return ''; 
        }
      }
}