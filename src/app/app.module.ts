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
import { ActionRenderer, StateRenderer, TeamPerformanceComponent } from './supervisor/team-performance/team-performance.component';
import { QueueStatisticsComponent } from './supervisor/queue-statistics/queue-statistics.component';
import { VerificationInformationModule } from './common-components/verification-information/verification-information.module';
import { PromptActionRenderer, PromptLibraryComponent } from './common-components/prompt-library/prompt-library.component';
import { EditPromptLibraryComponent } from './common-components/edit-prompt-library/edit-prompt-library.component';
import { ConfirmationModalComponent } from './common-components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalContentComponent,
    SupervisorComponent,
    AgentComponent,
    TeamPerformanceComponent,
    StateRenderer,
    ActionRenderer,
    QueueStatisticsComponent,
    PromptLibraryComponent,
    PromptActionRenderer,
    EditPromptLibraryComponent,
    ConfirmationModalComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    VerificationInformationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
