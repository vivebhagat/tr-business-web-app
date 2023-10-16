import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { AuthData } from 'src/app/model/auth/authData';
import { AuthService } from 'src/app/service/auth/auth-service';
import { BusinessUserService } from 'src/app/service/user/businessuser-service';

@Component({
    selector: 'role',
    templateUrl: 'role.component.html',
    styleUrls: ['role.component.css'],
    providers: [BusinessUserService]
})

export class RoleComponent implements OnInit {
    authData: AuthData = new AuthData;
    domainList: Array<any> = [];
    selectedRole: string = '';
    roleList: Array<any> = new Array<any>();
    alertMessage: AlertMessage = new AlertMessage;
    selectedDomain: any | undefined;
    warnClass: boolean = false;
    isAuthorized: boolean = false;

    constructor(private authService: AuthService,
        private route: Router,
        private businessUserService: BusinessUserService,
        private spinnerService: NgxSpinnerService) { }

    ngOnInit() {
        this.authData = this.authService.getAuthData()!;
        this.getDomainList();
    }

    resetAlert() {
        this.warnClass = true;
        setTimeout(() => {
            this.warnClass = false;
        }, 1000)
    }

    dismissAlert() {
        this.alertMessage = new AlertMessage;
    }

    getDomainList() {
        this.spinnerService.show();
        this.businessUserService.getDomainList(this.authData.UserId).subscribe({
            next: (response) => {
                this.domainList = response;
                this.spinnerService.hide();
            },
            error: (error) => {
                this.spinnerService.hide();
                this.handleRoleSelectionProcessError(error, "Error fetching domain list.")
            }
        });
    }

    selectAndSetDomain(domain: any) {
        this.spinnerService.show();
        this.businessUserService.selectDomain(domain.DomainKey.Value).subscribe({
            next: (response) => {
                const authData: AuthData = {
                    ...this.authService.getAuthData()!,
                    DomainKey: response.DomainKey,
                    DomainName: response.Domain,
                    SubDomain: response.SubDomain,
                    DomainKeyId: response.DomainKeyId,
                };
                localStorage.setItem('_businessauthdata', JSON.stringify(authData));
                setTimeout(() => {
                    this.spinnerService.hide();
                    this.getRoles();
                }, 1000);
            },
            error: (error) => {
                this.spinnerService.hide();
                this.handleRoleSelectionProcessError(error, "There was an error while assigning domain.")
            }
        });
    }

    getRoles() {
        this.dismissAlert();
        this.alertMessage.SuccessMessage = "Fetching roles and permissions...";
        this.businessUserService.getBusinessUserRoles(this.authData.UserId).subscribe({
            next: (response) => {
                this.dismissAlert();
                this.roleList = response;
                if (this.roleList.length == 1) {
                    this.selectedRole = this.roleList[0].Role.Name;
                    this.selectAndSetRole(this.selectedRole)
                } else if (response.length == 0) {
                    this.handleRoleSelectionProcessError(null, 'Your account does not have sufficient permissions to access the system.');
                    return;
                }

            },
            error: (error) => {
                this.handleRoleSelectionProcessError(error, "Error while fetching roles and permissions.")
            }
        });
    }


    selectAndSetRole(role: string) {
        this.dismissAlert();
        this.isAuthorized = true;
        this.alertMessage.SuccessMessage = "Assigning role and permission...";
        this.authService.roleSelect(role, this.authData.RefreshToken).subscribe({
                next: (response) => {
                    this.dismissAlert();
                    var data  = this.authService.getAuthData()!;
                    this.authData = data;
                    setTimeout(() => {
                        this.route.navigate(['dashboard']);
                    }, 2000);
                },
                error: (error) => {
                    this.handleRoleSelectionProcessError(error, "Error while assigning role and permission.")
                }
            });
        }

    handleRoleSelectionProcessError(err: any, errorMessage: string) {
        this.resetAlert();
        this.dismissAlert()
        this.alertMessage.ErrorMessage = errorMessage;
    }
}