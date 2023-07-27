import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  msg: string = '';
  title: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    
  }

  onClick(type: any) {
    if (type === 'yes') {
      this.activeModal.close('Close click');
    }

    if (type === 'no') {      
      this.onSubmit();
    }
  }

  onSubmit() {

  }
}
