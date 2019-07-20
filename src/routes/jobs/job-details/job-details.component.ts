import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(public global: GlobalService, private router: Router) { }

  ngOnInit() {
    if (this.global.jobDetail === undefined ) {
      this.router.navigate(['/']);
    }
  }


  goToApply(data) {
    this.global.jobDetail = data;
    this.router.navigate(['/apply']);
  }

}
