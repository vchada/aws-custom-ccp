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
