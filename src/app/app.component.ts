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

    // const contact = connect.core.getActiveContact();

    // // Check if there is an active contact
    // if (contact) {
    //   const attributes = {
    //     attribute1: 'value1',
    //     attribute2: 'value2',
    //     // Add more attributes as needed
    //   };

    //   // Set the contact attributes
    //   contact.getAgent().updateContactAttributes(attributes);
    // }

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

      contact.onEnded(function() {
        
        console.log('onEnded');
      });

      contact.addConnection(function(contact: any) {
        
        console.log('addConnection', contact);
      });

      contact.onConnected(() => {
              console.log(`onConnected(${contact.getContactId()})`);
              var attributeMap = contact.getAttributes();
              if(attributeMap && attributeMap.length > 0) {
                Object.values(attributeMap).forEach((item: any) => {
                  this.contactAttObj[item.name] = item.value;
                })
              }
      });
    });

    // connect.updateContactAttributes(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });
 

    connect.agent((agent: any) => {
      // gather information about the agent
      this.agent = agent;

      const agentSnapshot = agent.getRoutingProfile();
      if (agentSnapshot.defaultOutboundQueueId) {
        // The agent has a supervisor routing profile assigned
        console.log('Supervisor');
        this.isUserAgent = false;
      } else {
        // The agent does not have a supervisor routing profile assigned
        console.log('Agent');
        this.isUserAgent = true;
      }

      agent.onRoutingProfile((routingProfile: any) => {
        if (routingProfile.defaultOutboundQueueId) {
          console.log('Role changed to Supervisor');
          this.isUserAgent = false;
        } else {
          console.log('Role changed to Agent');
          this.isUserAgent = true;
        }
      });
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
