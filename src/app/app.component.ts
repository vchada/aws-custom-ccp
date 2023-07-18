import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ContactAttribute } from './model/contact-attribute.model';
import { environment } from 'src/environment/environment';

declare var connect: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  agent: any;
  isUserAgent: boolean | undefined;
  username: string = '';

  contactAttObj: any = new ContactAttribute();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    connect.core.initCCP(document.getElementById('ccp'), {
      // https://vchada.my.connect.aws/ccp-v2/softphone
      ccpUrl: environment.ccpUrl,
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
      contact.onEnded(() => {
        this.contactAttObj = new ContactAttribute();
      });

      contact.onConnected(() => {
        var attributeMap = contact.getAttributes();
        if (attributeMap && Object.values(attributeMap).length > 0) {
          Object.values(attributeMap).forEach((item: any) => {
            this.contactAttObj[item.name] = item.value;
          });
        }
      });
    });

    connect.agent((agent: any) => {
      this.agent = agent;
      this.username = agent.toSnapshot().agentData.configuration.username;
      const permission = agent.getPermissions();
      if (permission) {
        if (permission.length > 2) {
          console.log('Supervisor');
          this.isUserAgent = false;
        } else {
          console.log('Agent');
          this.isUserAgent = true;
        }
      }

      this.open();
    });
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
    modalRef.componentInstance.name = this.username;
  }
}
