import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AgentComponent } from './agent/agent.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { VerificationInformationModule } from './common-components/verification-information/verification-information.module';
import { PromptLibraryComponent } from './common-components/prompt-library/prompt-library.component';
import { EditPromptLibraryComponent } from './common-components/edit-prompt-library/edit-prompt-library.component';
import { ConfirmationModalComponent } from './common-components/confirmation-modal/confirmation-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PromptActionRendererComponent } from './common-components/prompt-action-renderer/prompt-action-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalContentComponent,
    SupervisorComponent,
    AgentComponent,
    PromptLibraryComponent,
    EditPromptLibraryComponent,
    ConfirmationModalComponent,
    PromptActionRendererComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    VerificationInformationModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
