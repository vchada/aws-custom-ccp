import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { EditPromptLibraryComponent } from '../edit-prompt-library/edit-prompt-library.component';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-prompt-action-renderer',
  templateUrl: './prompt-action-renderer.component.html',
  styleUrls: ['./prompt-action-renderer.component.scss']
})
export class PromptActionRendererComponent implements ICellRendererAngularComp {
  public value: any;
  state = '';
  params: any;

  constructor(private modalService: NgbModal, private commonDataService: CommonDataService) {}

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    this.state = params.data;
    this.params = params;
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
    modalRef.componentInstance.type = 'edit';

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
        this.commonDataService.editPromptLibrary.next(null);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
        this.commonDataService.editPromptLibrary.next(null);
      }
    );
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.msg = 'Are you sure !!!';
    modalRef.componentInstance.title = 'Delete';
  }
}