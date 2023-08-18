import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ContactAttribute } from './model/contact-attribute.model';
import { environment } from 'src/environment/environment';
import { CommonDataService } from './services/common-data.service';
import { HttpService } from './services/http.service';
import { VerificationInformation } from './model/verification-information.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserIdleService } from 'angular-user-idle';

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
  userLoggedIn: boolean = false;

  constructor(private modalService: NgbModal, private commonDataService: CommonDataService, private httpService: HttpService, private spinner: NgxSpinnerService, private userIdle: UserIdleService) {}

  ngOnInit(): void {

    this.userIdle.onTimerStart().subscribe(count => {
      // console.log(count);
    });
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.stop();
      this.stopWatching();
      // console.log('30 min Time is up! setting status to offline');
      this.setAgentStatus();
    });

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

    const eventBus = connect.core.getEventBus();
    eventBus.subscribe(connect.EventType.TERMINATED, () => {
      console.log('Logged out');
      this.userLoggedIn = false;
    });

    // Listen for the 'contactIncoming' event
    connect.contact((contact: any) => {
      contact.onEnded(() => {
        this.restart();
        this.startWatching(); 
        this.contactAttObj = new ContactAttribute();
        this.commonDataService.contactAttributeChange.next(this.contactAttObj);
      });

      contact.onConnected(() => {
        var attributeMap = contact.getAttributes();
        if (attributeMap && Object.values(attributeMap).length > 0) {
          Object.values(attributeMap).forEach((item: any) => {
            this.contactAttObj[item.name] = item.value;
          });
        }
        this.stop();
        this.stopWatching();
        this.commonDataService.contactAttributeChange.next(this.contactAttObj);
      });
    });

    connect.agent((agent: any) => {
      this.agent = agent;
      this.username = agent.toSnapshot().agentData.configuration.username;
      this.commonDataService.userName = this.username;
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
      this.userLoggedIn = true;
      this.fetchAddresses();
      
      this.userIdle.startWatching();

      agent.onStateChange((agentState: any) => {
        console.log('on state change -> ' + agentState);
        if(agentState.newState !== "Offline") {
          this.restart();
          this.startWatching(); 
        }
      });

    });
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  setAgentStatus() {
    if (this.agent != null) {
      let states = this.agent.getAgentStates();
      // "states" is an array of changeable states. You can filter the desired state to change by name.
      let offlineState = states.filter((state: any) => state.name === "Offline")[0];
                    
      // Change agent state
      this.agent.setState(offlineState, {
        success: function() {
            console.log("SetState succeeded");
        },
        failure: function() {
        console.log("SetState failed");
        }
      });
    }
  }

  fetchAddresses() {
    this.spinner.show();
    const reqData: any = {
      EmployeeId: this.username,
    }

    this.httpService
      .httpGet(
        environment.fetchAddress,
        reqData
      )
      .subscribe({
        next: (res: any) => {
          console.log('fetched successfully');
          if (res && !res.error) {
            this.open(res);
          } else {
            const data = new VerificationInformation;
            data.EmployeeId = this.username;
            this.open(data);            
          }
          this.spinner.hide();
        },
        error: () => {
          console.log('error');
          this.spinner.hide();
        },
      });
  }

  open(res: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    const modalRef = this.modalService.open(
      ModalContentComponent,
      ngbModalOptions
    );
    modalRef.componentInstance.name = this.username;
    modalRef.componentInstance.data = res;

  }
}
