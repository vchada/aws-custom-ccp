import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ColGroupDef,
  GridOptions,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-community';
import { environment } from 'src/environment/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PromptActionRendererComponent } from '../prompt-action-renderer/prompt-action-renderer.component';

@Component({
  selector: 'app-prompt-library',
  templateUrl: './prompt-library.component.html',
  styleUrls: ['./prompt-library.component.scss'],
})
export class PromptLibraryComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Item ID',
      field: 'item_id',
    },
    {
      headerName: 'Contact Flow Name',
      field: 'contact_flow_name',
    },
    {
      headerName: 'Language Code',
      field: 'language_code',
    },
    {
      headerName: 'Collection Key',
      field: 'colection_key',
    },
    {
      headerName: 'Item Type',
      field: 'item_type',
    },
    {
      headerName: 'Item Content',
      field: 'item_content',
    },
    {
      headerName: 'Action',
      field: 'action',
      width: 100,

      sortable: false,
      resizable: false,
      filter: false,
      cellRendererSelector: (params) => {
        const actionDetails = {
          component: PromptActionRendererComponent,
          additionalData: params,
        };
        if (params.data) {
          return actionDetails;
        }
        return undefined;
      },
    },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    suppressNavigable: true,
  };
  public rowData!: any[];
  public paginationPageSize = 10;
  gridApi: any;
  public gridOptions: GridOptions;
  completeData: any[] = [];
  filterText: string = '';

  public sideBar: SideBarDef | string | string[] | boolean | null = 'columns';

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
    this.gridOptions = {
      suppressCellFocus: true,
    };
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.spinner.show();
    this.http
      .get<any[]>(environment.getPostPromptLibrary)
      .subscribe((data: any) => {
        
        let rowData = [
          {
            item_id: '123456789',
            contact_flow_name: 'Test 1',
            language_code: 'EN_US',
            colection_key: 'abc123',
            item_type: 'Product',
            item_content: 'test content'
          },
          
          {
            item_id: '987456321',
            contact_flow_name: 'Test 1',
            language_code: 'EN_US',
            colection_key: 'abc123',
            item_type: 'Product',
            item_content: 'test content'
          }
        ];
        if(data && data.Items && data.Items.length > 0) {
          rowData = data.Items;
        }

        this.completeData = rowData;

        this.rowData = this.completeData;
        this.spinner.hide();
      });

    // params.columnApi.autoSizeAllColumns();
    this.gridApi = params.api;
    this.agGrid.api.sizeColumnsToFit();
    this.agGrid.api.setDomLayout('autoHeight');

  }

  
  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(this.filterText);
  }
}

