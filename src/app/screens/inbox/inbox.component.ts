import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TopBarComponent } from 'src/app/components/topbar/topbar.component';
import { AlertMessage } from 'src/app/model/alert/alert-message';

const InboxData = [
  {
    Id: 1,
    Title: 'John Doe',
    Message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.',
    Url: 'https://i.imgur.com/zYxDCQT.jpg',
    Time: '10 mins ago',
    IsRead: false
  },
  {
    Id: 2,
    Title: 'Richard Miles',
    Message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.',
    Url: 'https://i.imgur.com/w4Mp4ny.jpg',
    Time: '10 mins ago',
    IsRead: false
  },
  {
    Id: 3,
    Title: 'Brian Cumin',
    Message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.',
    Url: 'https://i.imgur.com/ltXdE4K.jpg',
    Time: '10 mins ago',
    IsRead: false
  },
  {
    Id: 4,
    Title: 'Lance Bogrol',
    Message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.',
    Url: 'https://i.imgur.com/CtAQDCP.jpg',
    Time: '10 mins ago',
    IsRead: true
  },
  {
    Id: 5,
    Title: 'Parsley Montana',
    Message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.',
    Url: 'https://i.imgur.com/zYxDCQT.jpg',
    Time: '10 mins ago',
    IsRead: true
  }
]

@Component({
  selector: 'inbox',
  templateUrl: 'inbox.component.html',
  styleUrls: ['inbox.component.css']
})

export class InboxComponent implements OnInit {
  sideBarVisible: boolean = true;
  toggle: boolean = false;
  alertMessage: AlertMessage = new AlertMessage;
  messageList: Array<any> =[];


  @ViewChild('navbar')
  navbar!: TopBarComponent;

  constructor(private spinnerService: NgxSpinnerService) { }

  ngOnInit() { 
    this.spinnerService.show();
    setTimeout(() => {
        this.spinnerService.hide();
        this.messageList = InboxData;
      }, 1000)
  }

  toggleNavBar(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
    this.toggle != this.toggle;
  }

  reqeustNavBarToggle($event: any) {
    this.navbar.toggleNavbar();
  }

  reply(){
    alert("This feature is under development.")
  }

  markAsRead(Id: number){
    let itemIndex = this.messageList.findIndex(m => m.Id == Id);
    this.messageList[itemIndex].IsRead = true;
    this.messageList = InboxData.filter(m => !m.IsRead) 
   }

  toggleInboxMessage(type: string): any {
    switch (type) {
      case 'ALL':
        return this.messageList = InboxData;
      case 'READ':
        return this.messageList = InboxData.filter(m => m.IsRead)
      case 'UNREAD':
        return this.messageList = InboxData.filter(m => !m.IsRead)
    }
  }
}