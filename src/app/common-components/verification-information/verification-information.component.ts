import { Component, Input, OnInit } from '@angular/core';
import { ContactAttribute } from 'src/app/model/contact-attribute.model';
import { CommonDataService } from 'src/app/services/common-data.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-verification-information',
  templateUrl: './verification-information.component.html',
  styleUrls: ['./verification-information.component.scss']
})
export class VerificationInformationComponent implements OnInit {

  @Input() agent: any;
  contactAttObj: any = new ContactAttribute();
  agentName: string = '';

  constructor(private httpService: HttpService, private commonDataService: CommonDataService) {

  }

  ngOnInit(): void {
    this.agentName = this.agent.getName()
    this.contactAttObj.verfication = '';

    this.commonDataService.contactAttributeChange.subscribe((val: any) => {
      this.contactAttObj = val;
        this.contactAttObj.FirstName = (val && val.name && val.name.split(',')[1]) ? val.name.split(',')[1]: '';
        this.contactAttObj.FirstName = (val && val.name && val.name.split(',')[0]) ? val.name.split(',')[0]: '';
    })
  }
  onSelect(prop: any, event: any) {
    this.contactAttObj[prop] = event.target.value;
  }

  onSubmit() {
    const reqData = JSON.stringify(this.contactAttObj)

    this.httpService.httpPost(environment.submitVerficationInfo, reqData).subscribe({
      next: () => {
        console.log('Updated successfully');
      },
      error: () => {
        console.log('error');
      }
    })
  }
}
