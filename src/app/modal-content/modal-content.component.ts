import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  addressDetails: any = [
    {
      type: 'Home',
      address : '20512 Bargene Way',
      city: 'Germantown',
      county: 'Montgomery',
      postalCode: '20874',
      state: 'Maryland',
      country: 'US'
    },
    {
      type: 'Work',
      address : '20512 Bargene Way',
      city: 'newport beach',
      county: 'Orange',
      postalCode: '92660',
      state: 'California',
      country: 'US'
    },
    {
      type: 'Other',
      address : '20512 Bargene Way',
      city: 'Beverly Hills ',
      county: 'Los Angeles',
      postalCode: '92110',
      state: 'California',
      country: 'US'
    }
  ]
  selectedAddressToEdit: any;

  addressForm = new FormGroup({
    type: new FormControl(''),
    address: new FormControl({value: '', disabled: false}, [Validators.required]),
    city: new FormControl({value: '', disabled: false}, [Validators.required]),
    county: new FormControl({value: '', disabled: false}, [Validators.required]),
    postalCode: new FormControl({value: '', disabled: false}, [Validators.required]),
    state: new FormControl({value: '', disabled: false}, [Validators.required]),
    country: new FormControl({value: '', disabled: false}, [Validators.required])
  })

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    
  }

  editAddress(address: any) {
    this.selectedAddressToEdit = address
    this.addressForm.patchValue(address);
  }

  onClick(type: any) {
    if(type === 'yes') {
      this.activeModal.close('Close click');
    }

    if(type === 'save') {      
      this.addressDetails[this.addressDetails.findIndex((item: any) => item.type === this.addressForm.value.type)] = this.addressForm.value;
      this.selectedAddressToEdit = null;
    }

    if(type === 'reset') {
      this.addressForm.patchValue(this.selectedAddressToEdit);
    }

    if(type === 'cancel') {
      this.addressForm.reset();
      this.selectedAddressToEdit = null;
    }
  }
}
