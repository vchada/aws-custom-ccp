import { Component, OnInit } from '@angular/core';

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
  
  constructor() {
    
  }

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
        const contactAttributes = contact.getAttributes()
    })
  }
}
