import { Component, Input, OnInit } from '@angular/core';
import { ContactAttribute } from 'src/app/model/contact-attribute.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-verification-information',
  templateUrl: './verification-information.component.html',
  styleUrls: ['./verification-information.component.scss']
})
export class VerificationInformationComponent implements OnInit {

  @Input() agent: any;
  @Input() contactAttObj: any = new ContactAttribute();
  agentName: string = '';

  constructor(private httpService: HttpService) {

  }

  ngOnInit(): void {
    this.agentName = this.agent.getName()
    this.contactAttObj.verfication = 'yes';
  }
  onSelect(prop: any, event: any) {
    this.contactAttObj[prop] = event.target.value;
  }

  onSubmit() {
    const reqData = JSON.stringify(this.contactAttObj)

    this.httpService.httpPost('https://vah6cknx1j.execute-api.us-east-1.amazonaws.com/prod', reqData).subscribe({
      next: () => {
        console.log('Updated successfully');
      },
      error: () => {
        console.log('error');
      }
    })
  }
}
