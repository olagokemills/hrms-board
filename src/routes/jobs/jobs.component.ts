import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/services/request/request.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/services/global/global.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs = [];
  searchText: any;
  constructor(private api: RequestService, private router: Router, public global: GlobalService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getJobs();
    }, 3000); 
  }

  getJobs() {
    this.api.getAllJobs().subscribe(data => {
      console.log(data);
      this.jobs = data['response'];
    });
  }

  goToJobDetails(data) {
    this.global.jobDetail = data;
    this.router.navigate(['/job-details']);
  }

}
