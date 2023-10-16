import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    sideBarVisible: boolean = true;
    toggle: boolean = false;

    
  @ViewChild('navbar')
  navbar!: TopBarComponent;
  
    constructor(private router: Router) { }

    ngOnInit() { }

    
    toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }
}