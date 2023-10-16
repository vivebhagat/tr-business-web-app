import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';

@Component({
    selector: 'property-add',
    templateUrl: 'property-add.component.html',
    styleUrls: ['property-add.component.css']
})

export class PropertyAddComponent implements OnInit {
    sideBarVisible: boolean = true;
    toggle: boolean = false;


    @ViewChild('navbar')
    navbar!: TopBarComponent;

    constructor() { }

    ngOnInit() { }

    toggleNavBar(event: any) {
        this.sideBarVisible = !this.sideBarVisible;
        this.toggle != this.toggle;
    }

    reqeustNavBarToggle($event: any) {
        this.navbar.toggleNavbar();
    }

    add(){

    }

    back(){
        
    }
}