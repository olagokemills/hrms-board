import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JobsComponent } from '../routes/jobs/jobs.component';
import { JobDetailsComponent } from '../routes/jobs/job-details/job-details.component';
import { JobApplyComponent } from '../routes/jobs/job-apply/job-apply.component';

import { RequestService } from 'src/services/request/request.service';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobDetailsComponent,
    JobApplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
