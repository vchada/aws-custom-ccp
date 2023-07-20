import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/http.service';
import { environment } from 'src/environment/environment';
import { VerificationInformation } from '../model/verification-information.model';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  addressDetails: any = [];
  selectedAddressToEdit: any;
  preferredAddressChange: boolean = false;
  name: string = '';

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
  submitReqData: any = {
    EmployeeId: '',
    homeAddress: {},
    workAddress: {},
    otherAddress: {},
    preferredAddress: '',
    email: '',
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
      EmployeeId: this.name,
    }

    this.httpService
      .httpGet(
        environment.fetchAddress,
        reqData
      )
      .subscribe({
        next: (res: any) => {
          console.log('fetched successfully');
          if (res && !res.error) {
            this.setData(res);
          } else {
            const data = new VerificationInformation;
            data.EmployeeId = this.name;
            this.setData(data);            
            this.preferredAddress = 'other';
          }
        },
        error: () => {
          console.log('error');
        },
      });
  }

  setData(res: any) {
    if (res) {
      this.submitReqData.email = res.Email;
      this.submitReqData.EmployeeId = res.EmployeeId;
      

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
        const other = this.addressDetails.find((item: any) => item.type === 'Other');
        this.submitReqData.otherAddress = {
          StreetNumber: other.streetNumber,
          StreetInfo: other.streetInfo,
          City: other.city,
          State: other.state,
          Country: other.country,
          preDirectional: '',
          streetSuffix: '',
          PostalCode: other.postalCode,
          AwsAccountId: this.awsAccountId
        }
        this.addressForm.patchValue(other);
      }
    }
  }

  isAddressAvailable(type: string) {
    return this.addressDetails.find((item: any) => item.type === type).City;
  }

  editAddress(address: any) {
    this.selectedAddressToEdit = address;
    this.addressForm.patchValue(address);
  }

  onSelect(event: any) {
    this.preferredAddress = event.target.value;
    this.preferredAddressChange = true;
  }

  onClick(type: any) {
    if (type === 'yes') {
      this.activeModal.close('Close click');
    }

    if (type === 'save') {      
      this.onSubmit();
    }

    if (type === 'reset') {
      this.preferredAddressChange = false;
      this.addressForm.patchValue(this.selectedAddressToEdit);
    }

    if (type === 'cancel') {
      this.addressForm.reset();
      this.preferredAddressChange = false;
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
        environment.submitAddress,
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
          this.preferredAddressChange = false;
          console.log('Updated successfully');
        },
        error: () => {
          console.log('error');
        },
      });
  }
}
