import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AgentComponent } from './agent/agent.component';
import { AgGridModule } from 'ag-grid-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VerificationInformationModule } from './common-components/verification-information/verification-information.module';
import { PromptLibraryComponent } from './common-components/prompt-library/prompt-library.component';
import { EditPromptLibraryComponent } from './common-components/edit-prompt-library/edit-prompt-library.component';
import { ConfirmationModalComponent } from './common-components/confirmation-modal/confirmation-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PromptActionRendererComponent } from './common-components/prompt-action-renderer/prompt-action-renderer.component';
import { CorsInterceptor } from './services/cors.interceptor';
import { CommonModule } from '@angular/common';
import { provideUserIdleConfig } from 'angular-user-idle';
import { environment } from 'src/environment/environment';
import { AllowInputDirective } from './directives/restrict-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    ModalContentComponent,
    SupervisorComponent,
    AgentComponent,
    PromptLibraryComponent,
    EditPromptLibraryComponent,
    ConfirmationModalComponent,
    PromptActionRendererComponent,
    AllowInputDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    VerificationInformationModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    },
    provideUserIdleConfig({ idle: 1, timeout: environment.stateInTimeout * 60, ping: 2000 })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
