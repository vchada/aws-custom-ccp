import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import {
  ColDef,
  ColGroupDef,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  SideBarDef,
} from 'ag-grid-community';
import { EditPromptLibraryComponent } from '../edit-prompt-library/edit-prompt-library.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { environment } from 'src/environment/environment';
import { NgxSpinnerService } from 'ngx-spinner';

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
          component: PromptActionRenderer,
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

// *************************************************************************************************

@Component({
  selector: 'app-prompt-action-renderer',
  template: `
    <span class="action" (click)="onAction('edit')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#ff0000"
        class="bi bi-pencil-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
        />
      </svg>
    </span>

    <!-- <span
      class="action"
      (click)="onAction('delete')"
      style="margin-left: 15px;"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#ff0000"
        class="bi bi-trash-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
        />
      </svg>
    </span> -->
  `,
})
export class PromptActionRenderer implements ICellRendererAngularComp {
  public value: any;
  state = '';

  constructor(private modalService: NgbModal) {}

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    this.state = params.data;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }

  onAction(type: any) {
    console.log(type);

    if (type === 'edit') {
      this.openEditModal();
    }

    if (type === 'delete') {
      this.openDeleteModal();
    }
  }

  openEditModal() {
    const modalRef = this.modalService.open(EditPromptLibraryComponent);
    modalRef.componentInstance.data = this.state;
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.msg = 'Are you sure !!!';
    modalRef.componentInstance.title = 'Delete';
  }
}
