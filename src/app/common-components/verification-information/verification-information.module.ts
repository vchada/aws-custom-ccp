import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationInformationComponent } from './verification-information.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    VerificationInformationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    VerificationInformationComponent
  ]
})
export class VerificationInformationModule { }
