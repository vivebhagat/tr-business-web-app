import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/auth/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { RoleComponent } from './screens/auth/role/role.component';
import { PropertyListComponent } from './screens/property/list/property-list.component';
import { LeaseAgreementComponent } from './screens/lease/lease-agreement/lease-agreement.component';
import { LeaseRequestComponent } from './screens/lease/lease-request/lease-request.component';
import { PropertyAddComponent } from './screens/property/add/property-add.component';
import { ProjectListComponent } from './screens/project/list/project-list.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { MemberRoleListComponent } from './screens/business-user-role/list/member-role-list.component';
import { BusinessUserListComponent } from './screens/business-user/list/business-user-list.component';
import { InboxComponent } from './screens/inbox/inbox.component';
import { BillingComponent } from './screens/billing/billing.component';
import { PropertyEditComponent } from './screens/property/edit/property-edit.component';
import { ContractRequestListComponent } from './screens/contract-request/list/contract-request-list.component';
import { ContractRequestAddComponent } from './screens/contract-request/add/contract-request-add.component';
import { ContractRequestEditComponent } from './screens/contract-request/edit/contract-request-edit.component';
import { RegisterComponent } from './screens/auth/register/register.component';
import { BusinessUserAddComponent } from './screens/business-user/add/business-user-add.component';
import { BusinessUserEditComponent } from './screens/business-user/edit/business-user-edit.component';
import { OrganizationListComponent } from './screens/org/org-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'role', component: RoleComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'property-list', component: PropertyListComponent },
  { path: 'applications', component: ContractRequestListComponent },
  { path: 'contracts', component: LeaseAgreementComponent },
  { path: 'property-add', component: PropertyAddComponent },
  { path: 'property-edit/:id', component: PropertyEditComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'member-role-list', component: MemberRoleListComponent },
  { path: 'member-list', component: BusinessUserListComponent },
  { path: 'member-add', component: BusinessUserAddComponent },
  { path: 'member-edit/:id', component: BusinessUserEditComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'contract-request-add', component: ContractRequestAddComponent },
  { path: 'contract-request-edit/:id', component: ContractRequestEditComponent },
  { path: 'organization', component: OrganizationListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
