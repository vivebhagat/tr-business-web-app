import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuData } from 'src/app/model/navigation/menu';
import { AuthService } from 'src/app/service/auth/auth-service';
import { MenuDataList } from 'src/app/model/navigation/menu-metadata';
import { Router } from '@angular/router';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SideBarComponent implements OnInit {
    expand:boolean = false;
    currentUrl:string = '';
    authData: any = {};
    dashboardId: any;
    logoURL: string = '';
    show: boolean =false;
    menuDataList = MenuDataList;
    
    @Output() toggleNavBar$: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(protected httpClient:HttpClient,
        public authService:AuthService,
        private router: Router) {
        this.currentUrl = window.location.pathname;
        this.logoURL = "https://cdn-icons-png.flaticon.com/512/7368/7368521.png"; // .replace('statics', 'statics/'+ this.authService._authData.domainkey );
    }

    ngOnInit(): void {
        this.setAllMenu();
        console.log(this.menuDataList)
    }

    goToDashboard() {
    }

    clickLink(link: string, index: number) {
        console.log("link",link)

        for(let i = 0; i < this.menuDataList.length; i++)
        {
            this.menuDataList[i].expanded = false;
            for(let j = 0; j < this.menuDataList[i].menus.length; j++)
            {
                if(this.menuDataList[i].menus[j].url===link)
                {
                    this.menuDataList[i].expanded = true;
                    this.menuDataList[i].menus[j].selected = true;
                }
                else
                {
                    this.menuDataList[i].menus[j].selected = false;
                }
            }   
        }
        this.router.navigate([link]);

     }

    toggle() {
        console.log('> Toggle');
        this.expand = !this.expand;
        this.toggleNavBar$.emit(this.expand);
    } 
    
    clickMenu(index: number, menu: MenuData) {        
        menu.expanded = !menu.expanded;
        if(menu.expanded) {
            for(let i = 0; i < this.menuDataList.length; i++)
            {
                if(this.menuDataList[i] !== menu)
                {
                    this.menuDataList[i].expanded =  !menu.expanded;
                }
            }
        }
    }

    setAllMenu() {
        MenuDataList.forEach(element => {

        });

    }
}