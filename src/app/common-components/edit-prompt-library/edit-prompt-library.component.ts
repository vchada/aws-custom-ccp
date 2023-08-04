import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonDataService } from 'src/app/services/common-data.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-edit-prompt-library',
  templateUrl: './edit-prompt-library.component.html',
  styleUrls: ['./edit-prompt-library.component.scss']
})
export class EditPromptLibraryComponent implements OnInit {
  data: any | undefined;
  type: string| undefined;

  promptLibraryForm = new FormGroup({
    item_id: new FormControl(''),
    contact_flow_name: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    language_code: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    colection_key: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    item_type: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    item_content: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ])
  });

  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService,
    private commonDataService: CommonDataService
  ) {}

  ngOnInit(): void {
    this.promptLibraryForm.patchValue(this.data)
  }

  onClick(type: any) {

    if (type === 'save') {      
      this.onSubmit();
    }

    if (type === 'reset') {
      if(this.type === 'edit') {
        this.promptLibraryForm.patchValue(this.data);
      } else {
        this.promptLibraryForm.reset();
      }
    }

    if (type === 'cancel') {
      this.promptLibraryForm.reset();
      this.activeModal.close();
    }
  }

  onSubmit() {

    let reqData: any = {
      languageCode: this.promptLibraryForm.value.language_code,
      contactFlowName: this.promptLibraryForm.value.contact_flow_name,
      itemId: this.promptLibraryForm.value.item_id,
      collectionKey: this.promptLibraryForm.value.colection_key,
      itemContent: this.promptLibraryForm.value.item_content,
      itemType: this.promptLibraryForm.value.item_type
    }

    if(this.type === 'edit') {
      reqData['modifiedUser'] = this.commonDataService.userName;
    } else {      
      reqData['createdUser'] = this.commonDataService.userName;
    }

    if(this.type === 'edit') {
      this.httpService.httpPut(environment.updatePromptLibrary, reqData).subscribe({
        next: (data: any) => {
          this.activeModal.close();
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.httpService.httpPost(environment.createPromptLibrary, reqData).subscribe({
        next: (data: any) => {
          this.activeModal.close();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
