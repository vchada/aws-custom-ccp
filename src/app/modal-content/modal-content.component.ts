import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  addressDetails = {
    address : '20512 Bargene Way',
    city: 'Germantown',
    county: 'Montgomery',
    postalCode: '20874',
    state: 'Maryland',
    country: 'US'
  }

  addressForm = new FormGroup({
    address: new FormControl({value: '', disabled: true}, [Validators.required]),
    city: new FormControl({value: '', disabled: true}, [Validators.required]),
    county: new FormControl({value: '', disabled: true}, [Validators.required]),
    postalCode: new FormControl({value: '', disabled: true}, [Validators.required]),
    state: new FormControl({value: '', disabled: true}, [Validators.required]),
    country: new FormControl({value: '', disabled: true}, [Validators.required])
  })

  constructor(public activeModal: NgbActiveModal) {
    this.addressForm.patchValue(this.addressDetails);
    this.addressForm.disable();
  }

  ngOnInit(): void {
    
  }

  onClick(type: any) {
    if(type === 'yes') {
      this.activeModal.close('Close click');
    }

    if(type === 'no') {
      this.addressForm.enable();
    }

    if(type === 'save') {
      this.activeModal.close('Close click');
    }

    if(type === 'reset') {
      this.addressForm.patchValue(this.addressDetails);
    }

    if(type === 'cancel') {
      this.addressForm.patchValue(this.addressDetails);
      this.addressForm.disable();
    }
  }
}
