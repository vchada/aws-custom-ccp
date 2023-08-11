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
import { HttpService } from 'src/app/services/http.service';
import { HttpClient } from '@angular/common/http';
import { EditPromptLibraryComponent } from '../edit-prompt-library/edit-prompt-library.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonDataService } from 'src/app/services/common-data.service';

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
      field: 'collection_key',
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

  constructor(private commonDataService: CommonDataService, private httpService: HttpService, private spinner: NgxSpinnerService, private modalService: NgbModal, private http: HttpClient) {
    this.gridOptions = {
      suppressCellFocus: true,
    };
  }

  ngOnInit(): void {
    this.commonDataService.editPromptLibrary.subscribe(() => {
      this.refreshData();
    })
  }

  onGridReady(params: GridReadyEvent<any>) {

    
    this.gridApi = params.api;
    this.refreshData();

  }

  
  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(this.filterText);
  }

  create() {
    const modalRef = this.modalService.open(EditPromptLibraryComponent);
    modalRef.componentInstance.data = {};
    modalRef.componentInstance.type = 'create';

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
        this.refreshData();
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
        this.refreshData();
      }
    );
  }

  refresh() {

    this.refreshData();
  }


  refreshData() {
    this.spinner.show();
    this.filterText = '';
    this.gridApi.setQuickFilter(this.filterText);
    this.httpService
      .httpGet(environment.fetchPromptLibrary)
      .subscribe({
        next: (data: any) => {
        
          // {
          //   item_id: '123456789',
          //   contact_flow_name: 'Test 1',
          //   language_code: 'EN_US',
          //   collection_key: 'abc123',
          //   item_type: 'Product',
          //   item_content: 'test content'
          // },
          
          // {
          //   item_id: '987456321',
          //   contact_flow_name: 'Test 1',
          //   language_code: 'EN_US',
          //   collection_key: 'abc123',
          //   item_type: 'Product',
          //   item_content: 'test content'
          // }
        let rowData = [];
        if(data && data.Items && data.Items.length > 0) {
          rowData = data.Items;
        }

        this.completeData = rowData;

        this.rowData = this.completeData;
        this.gridApi.setRowData(this.rowData);
        this.gridApi.refreshCells();
        this.spinner.hide();
      },
    error: () => {
      
      this.spinner.hide();
    }});

    // params.columnApi.autoSizeAllColumns();
    this.agGrid.api.sizeColumnsToFit();
    this.agGrid.api.setDomLayout('autoHeight');
  }
}

