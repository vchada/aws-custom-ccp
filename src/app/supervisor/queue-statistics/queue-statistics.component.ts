import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, ColGroupDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-queue-statistics',
  templateUrl: './queue-statistics.component.html',
  styleUrls: ['./queue-statistics.component.scss'],
})
export class QueueStatisticsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Queue Name',
      field: 'queueName',
    },
    {
      headerName: '# Calls',
      field: 'calls',
    },
    {
      headerName: 'Max Time',
      field: 'maxTime',
    },
    {
      headerName: 'Ready',
      field: 'ready',
    },
    {
      headerName: 'Not Ready',
      field: 'notReady',
    },
    {
      headerName: 'Active',
      children: [
        {
          headerName: 'In',
          field: 'in',
          filter: 'agTextColumnFilter',
        },
        {
          headerName: 'Out',
          field: 'out',
          filter: 'agNumberColumnFilter',
        },
        { headerName: 'Other', field: 'other' },
      ],
    },
    {
      headerName: 'WrapUp',
      children: [
        {
          headerName: 'Ready (Pending)',
          field: 'readyPending',
          filter: 'agNumberColumnFilter',
        },
        {
          headerName: 'Not Ready (Pending)',
          field: 'notReadyPending',
          filter: 'agNumberColumnFilter',
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };
  public rowData!: any[];
  public paginationPageSize = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onGridReady(params: GridReadyEvent<any>) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = [
          {
            queueName: 'SERV.APP.PSW.BKU.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 0,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.APP.PSW.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 0,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.ACC.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 0,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.AL2.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 1,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.ALL.BKU.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 0,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.ALL.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 3,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.APP.BKU.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 0,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.APP.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 0,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.ASP.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 3,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
          {
            queueName: 'SERV.DSK.ATT.CH',
            calls: 0,
            maxTime: '00:00:00',
            ready: 0,
            notReady: 0,
            in: 0,
            out: 0,
            other: 0,
            readyPending: 0,
            notReadyPending: 0,
          },
        ];
      });
    params.columnApi.autoSizeAllColumns();
    // this.agGrid.api.sizeColumnsToFit();
    this.agGrid.api.setDomLayout('autoHeight');
  }
}
