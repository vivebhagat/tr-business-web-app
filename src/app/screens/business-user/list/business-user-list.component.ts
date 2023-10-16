import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MEMBER_CONSTANTS } from 'src/app/constants/team-management/member/member';
import { BusinessUserService } from 'src/app/service/user/businessuser-service';


@Component({
  selector: 'business-user-list',
  templateUrl: 'business-user-list.component.html',
  styleUrls: ['business-user-list.component.css'],
  providers:[BusinessUserService]
})

export class BusinessUserListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  memberList: Array<any> = [];
  memberListHeaders = MEMBER_CONSTANTS.MEMBER_LIST_HEADERS;


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private businessUserService: BusinessUserService,
    private route: Router) { }

  ngOnInit() {
    this.getAllMembers();
  }

  dismissAlert(){
    this.alertMessage = new AlertMessage;
  }

  setPage(_n: number) {

  }

  range(size: number, count: number) {
    var ret: any = [];
    return ret;
  }

  getAllMembers() {
    this.dismissAlert();
    this.spinnerService.show();
    this.businessUserService.getBusinessUserList().subscribe({
        next: (response) => {
            this.memberList = response;
            this.spinnerService.hide();
        },
        error: (error) => {
            this.spinnerService.hide();
            this.alertMessage.ErrorMessage = "Error fetching member list";
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

  add(){
    this.route.navigate(['member-add']);
  }

  edit(Id: number){
    this.route.navigate(['member-edit/' + Id]);
  }
}