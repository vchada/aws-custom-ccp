import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-edit-prompt-library',
  templateUrl: './edit-prompt-library.component.html',
  styleUrls: ['./edit-prompt-library.component.scss']
})
export class EditPromptLibraryComponent implements OnInit {
  data: any | undefined;

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
    ]),
    created_user: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    last_modified_user: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    created_dt_tm: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    last_modified_dt_tm: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
  });

  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.promptLibraryForm.patchValue(this.data)
  }

  onClick(type: any) {

    if (type === 'save') {      
      this.onSubmit();
    }

    if (type === 'reset') {
      this.promptLibraryForm.patchValue(this.data);
    }

    if (type === 'cancel') {
      this.promptLibraryForm.reset();
      this.activeModal.close();
    }
  }

  onSubmit() {
    this.httpService
      .httpPost(environment.getPostPromptLibrary, this.promptLibraryForm.value)
      .subscribe((data: any) => {
        console.log('response from API')
      })
  }
}
