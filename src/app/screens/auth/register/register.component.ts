import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { AuthData } from 'src/app/model/auth/authData';
import { LoginData } from 'src/app/model/auth/login';
import { BusinessUser } from 'src/app/model/user/businessuser';
import { CreateBusinessUser } from 'src/app/model/user/create-businessuser';
import { AuthService } from 'src/app/service/auth/auth-service';
import { BusinessUserService } from 'src/app/service/user/businessuser-service';

const RegistrationState = {
  Failed: 'FAILED',
  InProcess: 'IN_PROCESS',
  Success: 'SUCCESS',
};

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [BusinessUserService]
})

export class RegisterComponent implements OnInit {
  entityData: CreateBusinessUser = new CreateBusinessUser;
  alertMessage: AlertMessage = new AlertMessage;
  authData: AuthData = new AuthData;
  warnClass: boolean = false;
  registrationState: string = '';
  message: string = '';
  isFirstNameValid: boolean = true;
  isLastNameValid: boolean = true;
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;

  constructor(public authService: AuthService,
    private businessUserService: BusinessUserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  dismissAlert() {
    this.message = '';
    this.alertMessage = new AlertMessage;
  }

  resetAlert() {
    this.warnClass = true;
    setTimeout(() => {
      this.warnClass = false;
    }, 500)
  }

  getUserName() {
    this.entityData.BusinessUser.UserName = this.entityData.BusinessUser.FirstName + '@demo.com';
  }

  register() {
    alert("This feature is under development.")
    return;
    this.dismissAlert();
    this.alertMessage.ErrorMessage = this.validateBusinessUser();

    if (this.alertMessage.ErrorMessage) {
      this.resetAlert();
      return;
    }

    this.businessUserService.register(this.entityData).subscribe({
      next: (response: any) => {
        this.alertMessage.SuccessMessage = 'Registration successfull.';
      },
      error: (err: any) => {
        this.handleLoginError(err, 'Registration failed. There was an error while creating user.');
      }
    });
  }

  validateBusinessUser(): string {
    let error: string = '';
    this.isFirstNameValid = !!this.entityData.BusinessUser.FirstName;
    this.isLastNameValid = !!this.entityData.BusinessUser.LastName;
    this.isEmailValid = !!this.entityData.BusinessUser.Email;
    this.isPasswordValid = !!this.entityData.BusinessUser.Password;

    if (!this.isFirstNameValid || !this.isLastNameValid || !this.isEmailValid || !this.isPasswordValid) {
      return 'Please fill all required fields.';
    }

    const emailFormatError = this.validateEmailFormat(this.entityData.BusinessUser.Email);

    if (emailFormatError) {
      this.isEmailValid = false;
      return emailFormatError;
    }

    const passwordFormatError = this.validatePasswordFormat(this.entityData.BusinessUser.Password);

    if (passwordFormatError) {
      this.isPasswordValid = false;
      return passwordFormatError;
    }
    return error;
  }

  validateEmailFormat(email: string): string {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) ? '' : 'Invalid email address format.';
  }

  validatePasswordFormat(password: string): string {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    return passwordRegex.test(password)
      ? ''
      : 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
  }

  handleLoginError(err: any, errorMessage: string) {
    this.resetAlert();
    this.registrationState = RegistrationState.Failed;
    this.authService.clearAuth();
    this.alertMessage.ErrorMessage = errorMessage;
  }

  onFocus(event: Event) {
    this.isFirstNameValid = true;
    this.isLastNameValid = true;
    this.isEmailValid = true;
    this.isPasswordValid = true;
    this.dismissAlert();
  }
}