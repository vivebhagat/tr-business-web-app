import { Component, Input, OnInit } from '@angular/core';
import { AlertMessage } from 'src/app/model/alert/alert-message';

@Component({
    selector: 'error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

    @Input() alertMessage!: AlertMessage;

    ngOnInit()  {
        this.alertMessage;
    }
    dismissAlert() {
        this.alertMessage = new AlertMessage;
    }
}
