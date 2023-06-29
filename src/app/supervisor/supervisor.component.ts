import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

  @Input() agent: any;
  agentName: string = '';
  constructor() {}  

  ngOnInit(): void {
    this.agentName = this.agent.getName()
  }
}
