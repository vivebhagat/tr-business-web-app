import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { AuthData } from 'src/app/model/auth/authData';
import { LoginData } from 'src/app/model/auth/login';
import { AuthService } from 'src/app/service/auth/auth-service';

const LoginState = {
  Failed: 'FAILED',
  InProcess: 'IN_PROCESS',
  Success: 'SUCCESS',
};

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  user: LoginData = new LoginData();
  alertMessage: AlertMessage = new AlertMessage;
  authData: AuthData = new AuthData;
  RoleList: Array<any> = [];
  warnClass: boolean = false;
  loginState: string = '';
  message: string = '';

  constructor(public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  dismissAlert() {
    this.message = '';
  }

  resetAlert() {
    this.warnClass = true;
    setTimeout(() => {
      this.warnClass = false;
    }, 500)
  }

  login(user: LoginData) {
    this.dismissAlert();
    this.loginState = LoginState.InProcess;
    this.message = 'Please wait. Logging in...';

    if (!this.isValidForm()) {
      this.dismissAlert();
      this.handleLoginError(null, 'Login failed. Please check username and password.');
      return;
    }

    this.authService.login(user).subscribe({
      next: (response: any) => {
        this.loginState = LoginState.Success;
        this.message = 'Login successful.';
        this.authData = this.authService.getAuthData()!;
        setTimeout(() => {
          this.navigate('role');
        }, 1000);
      },
      error: (err: any) => {
        this.handleLoginError(err, 'Login failed. Please check username and password.');
      }
    });
  }

  isValidForm(): boolean {
    return !!(this.user.UserName && this.user.Password);
  }

  handleLoginError(err: any, errorMessage: string) {
    this.resetAlert();
    this.loginState = LoginState.Failed;
    this.authService.clearAuth();
    this.message = errorMessage;
  }

  onFocus(event: Event) {
    this.loginState = '';
    this.dismissAlert();
  }
}