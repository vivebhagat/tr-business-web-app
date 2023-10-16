import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/auth/login/login.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { RoleComponent } from './screens/auth/role/role.component';
import { TopBarComponent } from './components/topbar/topbar.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { PropertyListComponent } from './screens/property/list/property-list.component';
import { LeaseAgreementComponent } from './screens/lease/lease-agreement/lease-agreement.component';
import { LeaseRequestComponent } from './screens/lease/lease-request/lease-request.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertyAddComponent } from './screens/property/add/property-add.component';
import { ProjectListComponent } from './screens/project/list/project-list.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { MemberRoleListComponent } from './screens/business-user-role/list/member-role-list.component';
import { InboxComponent } from './screens/inbox/inbox.component';
import { BillingComponent } from './screens/billing/billing.component';
import { CollapsibleComponent } from './components/collapsible/collapsibe.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { PropertyEditComponent } from './screens/property/edit/property-edit.component';
import { ContractRequestListComponent } from './screens/contract-request/list/contract-request-list.component';
import { ContractRequestAddComponent } from './screens/contract-request/add/contract-request-add.component';
import { FilterDropdownComponent } from './components/filter-dropdown/filter-dropdown-component';
import { ContractRequestEditComponent } from './screens/contract-request/edit/contract-request-edit.component';
import { RegisterComponent } from './screens/auth/register/register.component';
import { BusinessUserListComponent } from './screens/business-user/list/business-user-list.component';
import { BusinessUserAddComponent } from './screens/business-user/add/business-user-add.component';
import { BusinessUserEditComponent } from './screens/business-user/edit/business-user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent,
    DashboardComponent,
    TopBarComponent,
    SideBarComponent,
    PropertyListComponent,
    LeaseAgreementComponent,
    LeaseRequestComponent,
    PropertyAddComponent,
    ProjectListComponent,
    ProfileComponent,
    MemberRoleListComponent,
    InboxComponent,
    BillingComponent,
    CollapsibleComponent,
    PropertyEditComponent,
    ContractRequestAddComponent,
    ContractRequestListComponent,
    FilterDropdownComponent,
    ContractRequestEditComponent,
    RegisterComponent,
    BusinessUserListComponent,
    BusinessUserAddComponent,
    BusinessUserEditComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ], bootstrap: [AppComponent]
})
export class AppModule { }
