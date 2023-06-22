import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';

declare var connect: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  agentName = ''
  agentContacts: any;
  agentPermissions: any;
  
  
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    connect.core.initCCP(document.getElementById('ccp'), {
      // https://vchada.my.connect.aws/ccp-v2/softphone
      ccpUrl: 'https://vchada.my.connect.aws/connect/ccp-v2',
      region: 'us-east-1',
      loginPopup: true,
      loginPopupAutoClose: true,
      softphone: {
          allowFramedSoftphone: true
      },
      pageOptions: {
          enableAudioDeviceSettings: true,
          enablePhoneTypeSettings: true
      }
      
    })
    
    connect.agent((agent: any) => {
      // gather information about the agent
      this.agentName = agent.getName()
      
      this.agentContacts = agent.getContacts()
      this.agentPermissions = agent.getPermissions()
    })
    
    // On inbound communication
    connect.contact((contact: any) => {
        // receive contact metadata
        const contactAttributes = contact.getAttributes();
    })

    this.open();
  }

	open() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
  };
		const modalRef = this.modalService.open(ModalContentComponent, ngbModalOptions);
		modalRef.componentInstance.name = 'World';
	}
}
