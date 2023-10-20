import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { AuthData } from 'src/app/model/auth/authData';
import { Organization } from 'src/app/model/setup/organization';
import { UpdateBusinessUser } from 'src/app/model/user/update-businessuser';
import { AuthService } from 'src/app/service/auth/auth-service';
import { BusinessUserService } from 'src/app/service/user/businessuser-service';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  providers: [BusinessUserService]
})

export class ProfileComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  authData: AuthData = new AuthData;
  entityData: UpdateBusinessUser = new UpdateBusinessUser;
  warnClass: boolean = false;
  organization: Organization = new Organization;
  role: string = '';

  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private businessUserService: BusinessUserService,
    private authService: AuthService,
    private spinnerService: NgxSpinnerService) {
    this.authData = this.authService.getAuthData()!;
  }

  ngOnInit() {
    this.getBusinessUserDetails()
    this.getAllOrganizations();
    this.role = this.authData.RoleName;
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }

  dismissAlert() {
    this.alertMessage = new AlertMessage;
}

resetAlert() {
  this.warnClass = true;
  setTimeout(() => {
      this.warnClass = false;
  }, 500)
}


getAllOrganizations() {
  this.dismissAlert();
  this.spinnerService.show();
  this.authService.getAllOrganizations().subscribe({
    next: (response) => {
      this.organization = response[0];
      this.spinnerService.hide();
    },
    error: (error) => {
      this.spinnerService.hide();
      this.alertMessage.ErrorMessage = "Error fetching organization details.";
    }
  });
}


  getBusinessUserDetails() {
    this.spinnerService.show();
    this.businessUserService.getBusinessUserDetails(this.authData.UserId).subscribe({
      next: (response) => {
        this.entityData.BusinessUser = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }

  save() {
    this.spinnerService.show();
    this.businessUserService.updateProfile(this.entityData).subscribe({
      next: (response: any) => {
        this.entityData.BusinessUser = response;
        this.alertMessage.SuccessMessage = "Your profile information has been successfully saved."
        this.spinnerService.hide();
      },
      error: (error: any) => {
        this.resetAlert();
        this.alertMessage.ErrorMessage = "There was an error while updating profile details."
        this.spinnerService.hide();
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

}