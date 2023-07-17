import { Component, Input, OnInit } from '@angular/core';
import { ContactAttribute } from '../model/contact-attribute.model';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  @Input() agent: any;
  @Input() contactAttObj: ContactAttribute = new ContactAttribute();

  constructor() {

  }

  ngOnInit(): void {
  }

}
