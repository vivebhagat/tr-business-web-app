import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { ProjectHelper } from '../helper/project-helper';
import { Router } from '@angular/router';
import { PROJECT_CONSTANTS } from 'src/app/constants/estate/project-constant';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['project-list.component.css'],
})

export class ProjectListComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  projectList: Array<any> = [];
  projectListHeaders = PROJECT_CONSTANTS.PROJECT_LIST_HEADERS;
  projectHelper: ProjectHelper = new ProjectHelper;


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService,
    private route: Router,
    ) { }

  ngOnInit() {
    this.getAllProjects();
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

  getAllProjects() {
    this.spinnerService.show();
    setTimeout(() => {
        this.spinnerService.hide();
        this.projectList = this.projectHelper.sampleProjects;
      }, 1000)
  }


  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }

  add(){
    this.route.navigate(['project-add']);
  }
}