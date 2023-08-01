import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { EditPromptLibraryComponent } from '../edit-prompt-library/edit-prompt-library.component';

@Component({
  selector: 'app-prompt-action-renderer',
  templateUrl: './prompt-action-renderer.component.html',
  styleUrls: ['./prompt-action-renderer.component.scss']
})
export class PromptActionRendererComponent implements ICellRendererAngularComp {
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