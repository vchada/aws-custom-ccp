import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

  @Input() agent: any;
  @Input() contactAttObj: any;
  
  constructor() {}  

  ngOnInit(): void {
  }
}
