import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthData } from 'src/app/model/auth/authData';
import { AuthService } from 'src/app/service/auth/auth-service';

@Component({
    selector: 'topbar',
    templateUrl: 'topbar.component.html',
    styleUrls: ['topbar.component.css']
})

export class TopBarComponent implements OnInit {
    @Output() requestNavBarToggle$: EventEmitter<boolean> = new EventEmitter;
    @Input() messages: Array<any> = [];
    @Input() alertCount: number = 0;

    UserName: string = '';
    UserRole: string = '';
    //messages: Array<any> = [];
    previousAlertCount: number = 0;
    show_alerts: boolean = false;
    show_auth_menu: boolean = false;
    show_favorite: boolean = false;
    documentElement: any; 
    isMobile: boolean = false;
    isFullScreen: boolean = false;
    logoURL: string = '';
    resize_style: string = 'left:0px;z-index:1007;';
    showAlertDetails: boolean = false;
    profileImage: string = '';
    defaultProfileImage = 'assets/images/default-avtar.png';
    authData: AuthData = new AuthData;

    constructor(
      public authService: AuthService,
      private route: Router,
      @Inject(DOCUMENT) private document: any) {
      this.authData = this.authService.getAuthData()!
      if(this.authData != undefined){
        this.UserName = this.authData.UserName;
      }
      else{
        this.UserName = this.authService.getAuthData()!.UserName;
      }
      this.UserRole = this.authService.getAuthData()!.RoleName;
      this.logoURL = "https://static.thenounproject.com/png/778835-200.png"; // .replace('statics', 'statics/'+ this.authService._authData.domainkey );
    }

    parseJsonBody(body: string): any {
      try {
        return JSON.parse(body);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    }

 
    logout() {
      const confirmLogout = confirm("Are you sure you want to logout?");
      if (confirmLogout) {
          this.authService.logout(this.authData.UserId)
          .subscribe({
            next: (response) => {
              localStorage.removeItem('_businessauthdata');
              this.route.navigate(['login']);
            },
            error: (error) => {
              localStorage.removeItem('_businessauthdata');
              this.route.navigate(['login']);
              console.log(error)
            }
        });
      }
  }
  
    clearMessage(index: number) {
      this.messages.splice(index, 1);
      localStorage.setItem('alert_list', JSON.stringify(this.messages));  
      this.alertCount = this.messages.length;
    }

    formatDate(date: Date): string {
      return moment(date).format('DD/MM/YYYY h:mm A');
    }

    showAlerts() {
      this.showAlertDetails = !this.showAlertDetails;
    }

    ngOnInit(): void {
      this.chkScreenMode();
      this.documentElement = document.documentElement;
      if(window.visualViewport!.width < 768)
      {
       this.isMobile = true;
      }
      else
      {
        this.isMobile = false;
      }
    }
    
    goToAlert() {
    }


    changeRole() {
        this.route.navigate(['role']);
    }

    toggleAlert() {

    }

    @HostListener('document:fullscreenchange', ['$event'])
    @HostListener('document:webkitfullscreenchange', ['$event'])
    @HostListener('document:mozfullscreenchange', ['$event'])
    @HostListener('document:MSFullscreenChange', ['$event'])
    fullscreenmodes($event:any){
      this.chkScreenMode();
    }

    chkScreenMode() {
      if(document.fullscreenElement){
        //fullscreen
        this.isFullScreen = true;
      } else{
        //not in full screen
        this.isFullScreen = false;
      }
    }

    openFullscreen() {
      if (this.documentElement.requestFullscreen) {
        this.documentElement.requestFullscreen();
      } else if (this.documentElement.mozRequestFullScreen) {
        /* Firefox */
        this.documentElement.mozRequestFullScreen();
      } else if (this.documentElement.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.documentElement.webkitRequestFullscreen();
      } else if (this.documentElement.msRequestFullscreen) {
        /* IE/Edge */
        this.documentElement.msRequestFullscreen();
      }
    }

  /* Close fullscreen */
    closeFullscreen() {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }

    toggleFavorite() {
      this.show_favorite = !this.show_favorite;
    }

    toggleNavbar() {
  //  this.resize_style = this.resize_style=='left:250px;'? 'left:0px;':'left:250px;';
      this.requestNavBarToggle$.emit(true);
    }

    toggleAuthMenu() {
      this.show_auth_menu = !this.show_auth_menu;
    }
}