import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthData } from 'src/app/model/auth/authData';
import { ORG_CONSTANTS } from 'src/app/constants/setup/org-constant';
import { UpdateOrganization } from 'src/app/model/setup/update-organization';
import { AuthService } from 'src/app/service/auth/auth-service';


@Component({
  selector: 'org-edit',
  templateUrl: 'org-edit.component.html',
  styleUrls: ['org-edit.component.css'],
  providers: [],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})

export class OrganizationEditComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  showModal: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  warnClass: boolean = false;
  currentTab: string = 'PRIMARY';
  action: string = '';
  enableEdit: boolean = false;
  modelIndex: number = 0;
  tabs = ORG_CONSTANTS.ORG_TABS;
  orgConstant = ORG_CONSTANTS;
  entityData: UpdateOrganization = new UpdateOrganization;
  modalMessage: string = '';
  isExpanded: boolean = false;
  authData: AuthData = new AuthData;
  imageFile: any;
  selectedImage: any;
  orgId: number = 0;


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private authService: AuthService,
    protected route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.orgId = params['id'];
      });
      this.getOrganization();
  }

  edit() {
    this.dismissAlert();
    this.spinnerService.show();
    const jsonString = JSON.stringify(this.entityData);
    const formData = new FormData();
    formData.append('ModelString', jsonString);
    formData.append('file', this.imageFile);
    this.authService.editOrganization(formData).subscribe({
      next: (response) => {
        this.entityData.Organization = response;
        this.spinnerService.hide();
        this.alertMessage.SuccessMessage = "Organization updated successfully.";
      },
      error: (error) => {
        this.spinnerService.hide();
        this.alertMessage.ErrorMessage = "Error updating organization details.";
      }
    });
  }


  dismissAlert() {
    this.alertMessage = new AlertMessage;
    this.modalMessage = '';
  }

  resetAlert() {
    this.warnClass = true;
    setTimeout(() => {
      this.warnClass = false;
    }, 1000)
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }


  getOrganization() {
    this.spinnerService.show();
    this.authService.getOrganization(this.orgId).subscribe({
      next: (response) => {
        this.entityData.Organization = response;
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }

  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  back() {
    this.router.navigate(['organization'])
  }

  getImageData(event: any) {
    this.imageFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      if (reader.result) {
        this.entityData.Organization.Url = reader.result?.toString();
      }
    }
  }

  deleteImage() {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
    else {
      this.entityData.Organization.Url = '';
    }
  }
}