import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CommunityService } from 'src/app/service/community/community-service';
import { COMMUNITY_CONSTANTS } from 'src/app/constants/estate/community-constant';


@Component({
  selector: 'Community-list',
  templateUrl: 'Community-list.component.html',
  styleUrls: ['Community-list.component.css'],
  providers:[CommunityService]
})

export class CommunityListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  communityList: Array<any> = [];
  communityListHeaders = COMMUNITY_CONSTANTS.COMMUNITY_LIST_HEADERS;


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private communityService: CommunityService,
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
    this.communityService.getAllCommunities().subscribe({
        next: (response) => {
            this.communityList = response;
            this.spinnerService.hide();
        },
        error: (error) => {
            this.spinnerService.hide();
            this.alertMessage.ErrorMessage = "Error fetching community list";
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
    this.route.navigate(['community-add']);
  }

  edit(Id: number){
    this.route.navigate(['community-edit/' + Id]);
  }
}