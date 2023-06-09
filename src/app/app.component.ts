import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';

declare var connect: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  agent: any;
  isUserAgent: boolean | undefined;

  contactAttObj: any = {
    verfication: '',
    notes: '',
    policyNumber: '',
    source: '',
    FirstName: '',
    LastName: '',
    suffix: '',
    lob: '',
    relation: '',
    status: '',
  }

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    connect.core.initCCP(document.getElementById('ccp'), {
      // https://vchada.my.connect.aws/ccp-v2/softphone
      ccpUrl: 'https://vchada.my.connect.aws/connect/ccp-v2',
      region: 'us-east-1',
      loginPopup: true,
      loginPopupAutoClose: true,
      softphone: {
        allowFramedSoftphone: true,
      },
      pageOptions: {
        enableAudioDeviceSettings: true,
        enablePhoneTypeSettings: true,
      },
    });


    // Listen for the 'contactIncoming' event
    connect.contact((contact: any) => {
      // Handle the incoming contact (call)
      // ...
      contact.onIncoming(function(contact: any) {
        console.log('onIncoming', contact);
      });

      contact.onRefresh(function(contact: any) {
        console.log('onRefresh', contact);
      });

      contact.onAccepted(function(contact: any) {
        console.log('onAccepted', contact);
      });

      contact.onEnded(() => {
        this.contactAttObj = {
          verfication: '',
          notes: '',
          policyNumber: '',
          source: '',
          FirstName: '',
          LastName: '',
          suffix: '',
          lob: '',
          relation: '',
          status: '',
        }
        console.log('onEnded');
      });

      contact.addConnection(function(contact: any) {
        
        console.log('addConnection', contact);
      });

      contact.onConnected(() => {
              var attributeMap = contact.getAttributes();
              if(attributeMap && Object.values(attributeMap).length > 0) {
                Object.values(attributeMap).forEach((item: any) => {
                  this.contactAttObj[item.name] = item.value;
                })
              }
      });
    });


    connect.agent((agent: any) => {
      // gather information about the agent
      this.agent = agent;
      // if (connect.core.getAgent().getType() === connect.AgentType.AGENT) {
      //   // Logic for agents
      //   console.log('Connected user is an agent');
      // } else if (connect.core.getAgent().getType() === connect.AgentType.SUPERVISOR) {
      //   // Logic for supervisors
      //   console.log('Connected user is a supervisor');
      // } else {
      //   // Logic for other roles or unidentified users
      //   console.log('Connected user role unknown');
      // }

      const permission = agent.getPermissions();
      if (permission) {

        if(permission.length > 2) {
          console.log('Supervisor');
          this.isUserAgent = false;
        } else {
          console.log('Agent');
          this.isUserAgent = true;
        }
      }

      // agent.onRoutingProfile((routingProfile: any) => {
      //   if (routingProfile.defaultOutboundQueue.queueId) {
      //     console.log('Role changed to Supervisor');
      //     this.isUserAgent = false;
      //   } else {
      //     console.log('Role changed to Agent');
      //     this.isUserAgent = true;
      //   }
      // });
    });

    this.open();
  }

  open() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    const modalRef = this.modalService.open(
      ModalContentComponent,
      ngbModalOptions
    );
    modalRef.componentInstance.name = 'World';
  }
}
