import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsComponent } from '../routes/jobs/jobs.component';
import { JobDetailsComponent } from '../routes/jobs/job-details/job-details.component';
import { JobApplyComponent } from '../routes/jobs/job-apply/job-apply.component';
const routes: Routes = [
  {path: '',               component: JobsComponent},
  {path: 'job-details',  component: JobDetailsComponent},
  {path: 'apply',       component: JobApplyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
