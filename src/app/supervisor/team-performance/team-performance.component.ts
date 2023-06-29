import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, ColGroupDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-team-performance',
  templateUrl: './team-performance.component.html',
  styleUrls: ['./team-performance.component.scss']
})
export class TeamPerformanceComponent implements OnInit {
  
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Agent Name',
      field: 'agentName',
    },
    {
      headerName: 'State',
      field: 'state',
      cellRendererSelector: (params) => {
        const stateDetails = {
          component: StateRenderer
        };
        if (params.data) {
          return stateDetails;
        }
        return undefined;
      }
    },
    {
      headerName: 'Time in State',
      field: 'timeInState',
    },
    {
      headerName: 'Extension',
      field: 'extension',
    },
    {
      headerName: 'Action',
      field: 'action',
      cellRendererSelector: (params) => {
        const actionDetails = {
          component: ActionRenderer
        };
        if (params.data) {
          return actionDetails;
        }
        return undefined;
      }
    }  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };
  public rowData!: any[];
  public paginationPageSize = 10;
  gridApi: any;
  filterText: string = '';
  includeLoggedOut = false;
  completeData = [];

  constructor(private http: HttpClient) {}  

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data:any) => {
        data = [
          {
            agentName: 'David_RT Oyeyipo',
            state: 'Ready',
            timeInState: '00:39:01',
            extension: '11112205616',
            action: ''
          },
          {
            agentName: 'Savonne_RT Suggs',
            state: 'Not Ready',
            timeInState: '00:39:01',
            extension: '11112205300',
            action: ''
          },
          {
            agentName: 'Scott Boland',
            state: 'Offline',
            timeInState: '00:40:01',
            extension: '11112205069',
            action: ''
          },
          {
            agentName: 'Tanish Jones',
            state: 'Ready',
            timeInState: '00:42:01',
            extension: '11112205077',
            action: ''
          },
          {
            agentName: 'Steve Suggs',
            state: 'Not Ready',
            timeInState: '00:45:01',
            extension: '11112205388',
            action: ''
          },
          {
            agentName: 'Starc Jones',
            state: 'Ready',
            timeInState: '00:49:01',
            extension: '11112205997',
            action: ''
          },
          {
            agentName: 'Josh Hazelwood',
            state: 'Offline',
            timeInState: '00:50:01',
            extension: '11112205044',
            action: ''
          }
        ]
        
        this.completeData = data;
        this.onToggleChanged();
      });

      // params.columnApi.autoSizeAllColumns();
      this.gridApi = params.api;
      this.agGrid.api.sizeColumnsToFit();
      this.agGrid.api.setDomLayout('autoHeight');
  }

  onToggleChanged() {
    if(this.includeLoggedOut) {
      this.rowData = this.completeData;
    } else {
      this.rowData = this.completeData.filter((item: any) => item.state !== 'Offline');
    }
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(this.filterText);
  }

}


import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-state-renderer',
  template: ` <span *ngIf="value === 'Not Ready'"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#ff0000" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/></svg></span> <span *ngIf="value === 'Ready'"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#008000" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/></svg></span> <span *ngIf="value === 'Offline'"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
</svg></span> {{ value }} `,
})
export class StateRenderer implements ICellRendererAngularComp {
  public imageSource!: string;
  public value: any;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}

@Component({
  selector: 'app-action-renderer',
  template: ` 
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg> `,
})
export class ActionRenderer implements ICellRendererAngularComp {
  public imageSource!: string;
  public value: any;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}

