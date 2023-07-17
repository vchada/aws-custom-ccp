import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  addressDetails: any = [];
  selectedAddressToEdit: any;

  addressForm = new FormGroup({
    type: new FormControl(''),
    streetNumber: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    streetInfo: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    city: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    state: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    country: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    postalCode: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
  });
  submitReqData = {
    EmployeeId: 'vchada',
    homeAddress: {},
    workAddress: {},
    otherAddress: {},
    preferredAddress: '',
    email: 'test@example.com',
  };
  
  preferredAddress: string = '';
  awsAccountId: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.fetchAddresses();
  }

  fetchAddresses() {
     
    const reqData: any = {
      EmployeeId: 'vchada',
    }

    this.httpService
      .httpGet(
        'https://vah6cknx1j.execute-api.us-east-1.amazonaws.com/prod',
        reqData
      )
      .subscribe({
        next: (res: any) => {
          console.log('fetched successfully');
          if (res) {
            this.preferredAddress = res.PreferredAddress;
            if (res.HomeAddress) {
              this.addressDetails.push({
                type: 'Home',
                streetNumber: res.HomeAddress.StreetNumber,
                streetInfo: res.HomeAddress.StreetInfo,
                city: res.HomeAddress.City,
                postalCode: res.HomeAddress.PostalCode,
                state: res.HomeAddress.State,
                country: res.HomeAddress.Country,
              });

              this.submitReqData.homeAddress = {
                StreetNumber: res.HomeAddress.StreetNumber,
                StreetInfo: res.HomeAddress.StreetInfo,
                City: res.HomeAddress.City,
                State: res.HomeAddress.State,
                Country: res.HomeAddress.Country,
                preDirectional: '',
                streetSuffix: '',
                PostalCode: res.HomeAddress.PostalCode
              }
            }

            if (res.WorkAddress) {
              this.addressDetails.push({
                type: 'Work',
                streetNumber: res.WorkAddress.StreetNumber,
                streetInfo: res.WorkAddress.StreetInfo,
                city: res.WorkAddress.City,
                postalCode: res.WorkAddress.PostalCode,
                state: res.WorkAddress.State,
                country: res.WorkAddress.Country,
              });

              this.submitReqData.workAddress = {
                StreetNumber: res.WorkAddress.StreetNumber,
                StreetInfo: res.WorkAddress.StreetInfo,
                City: res.WorkAddress.City,
                State: res.WorkAddress.State,
                Country: res.WorkAddress.Country,
                preDirectional: '',
                streetSuffix: '',
                PostalCode: res.WorkAddress.PostalCode
              }
            }

            if (res.OtherAddress && res.OtherAddress.mappedValidateAddressResponse) {
              this.addressDetails.push({
                type: 'Other',
                streetNumber: res.OtherAddress.mappedValidateAddressResponse.StreetNumber? res.OtherAddress.mappedValidateAddressResponse.StreetNumber: '',
                streetInfo: res.OtherAddress.mappedValidateAddressResponse.StreetInfo? res.OtherAddress.mappedValidateAddressResponse.StreetInfo: '',
                city: res.OtherAddress.mappedValidateAddressResponse.City ? res.OtherAddress.mappedValidateAddressResponse.City: '',
                postalCode: res.OtherAddress.mappedValidateAddressResponse.PostalCode ? res.OtherAddress.mappedValidateAddressResponse.PostalCode: '',
                state: res.OtherAddress.mappedValidateAddressResponse.State ? res.OtherAddress.mappedValidateAddressResponse.State: '',
                country: res.OtherAddress.mappedValidateAddressResponse.Country ? res.OtherAddress.mappedValidateAddressResponse.Country: '',
              });

              this.awsAccountId = res.OtherAddress.mappedValidateAddressResponse.AwsAccountId;
            }
          }
        },
        error: () => {
          console.log('error');
        },
      });
  }

  editAddress(address: any) {
    this.selectedAddressToEdit = address;
    this.addressForm.patchValue(address);
  }

  onSelect(event: any) {
    this.preferredAddress = event.target.value;
  }

  onClick(type: any) {
    if (type === 'yes') {
      this.activeModal.close('Close click');
    }

    if (type === 'save') {
      this.onSubmit();
    }

    if (type === 'reset') {
      this.addressForm.patchValue(this.selectedAddressToEdit);
    }

    if (type === 'cancel') {
      this.addressForm.reset();
      this.selectedAddressToEdit = null;
    }
  }

  onSubmit() {
    const value = this.addressForm.value;
    this.submitReqData.preferredAddress = this.preferredAddress;
    this.submitReqData.otherAddress = {
      StreetNumber: value.streetNumber,
      StreetInfo: value.streetInfo,
      City: value.city,
      State: value.state,
      Country: value.country,
      preDirectional: '',
      streetSuffix: '',
      PostalCode: value.postalCode,
      AwsAccountId: this.awsAccountId
    }
    const reqPayload = JSON.stringify(this.submitReqData)

    this.httpService
      .httpPost(
        'https://vah6cknx1j.execute-api.us-east-1.amazonaws.com/prod',
        reqPayload
      )
      .subscribe({
        next: () => {
          this.addressDetails[
            this.addressDetails.findIndex(
              (item: any) => item.type === this.addressForm.value.type
            )
          ] = this.addressForm.value;
          this.selectedAddressToEdit = null;
          console.log('Updated successfully');
        },
        error: () => {
          console.log('error');
        },
      });
  }
}
