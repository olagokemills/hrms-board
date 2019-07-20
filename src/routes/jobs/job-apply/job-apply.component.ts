import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/services/request/request.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.css']
})
export class JobApplyComponent implements OnInit {
  submit = false;
  registerForm: FormGroup;
  constructor(public global: GlobalService, private router: Router, public fb: FormBuilder, private api: RequestService) { }

  ngOnInit() {
    if (this.global.jobDetail === undefined ) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone:  ['', Validators.required],
      email:  ['', Validators.required],
      cvlink: ['', Validators.required],
      reason:['', Validators.required]
    })
  }

  submitForm() {
    setTimeout(() => {
      this.submit = true;
    }, 2000);
    setTimeout(() => {
      this.submit = false;
    }, 8000);
  }

  onSubmit() {
    let detail = new FormData();
    let notify = new FormData();

    detail.append('firstname', this.registerForm.value.firstname);
    detail.append('lastname', this.registerForm.value.lastname);
    detail.append('email', this.registerForm.value.email);
    detail.append('phone', this.registerForm.value.phone);
    detail.append('cvlink', this.registerForm.value.cvlink);
    detail.append('reason', this.registerForm.value.reason);
    detail.append('jobid', this.global.jobDetail.jobid);
    detail.append('title', this.global.jobDetail.title);

    notify.append('email', 'noreply@hrms.com');
    notify.append('recipient', this.registerForm.value.email);
    notify.append('sender', 'HRMS HR');
    notify.append('subject', 'Job Application');
    notify.append('message', 'You have successfully applied to the job: ' + this.global.jobDetail.title);  

    // form['firstname'] = this.registerForm.value.firstname;
    // form['lastname'] = this.registerForm.value.lastname;
    // form['email'] = this.registerForm.value.email;
    // form['phone'] = this.registerForm.value.phone;
    // form['notes'] = this.registerForm.value.notes;
    // form['eventid'] = this.global.eventDetail.eventid;
    // form['title'] = this.global.eventDetail.title;

    // this.api.registerForEvent(detail).subscribe(
    //   data => console.log(data),
    //   error => console.log(error)
    // )

    this.api.postRequest('jobs/apply', detail)
        .then(res => {
          console.log(res);
          (res.response === 'inserted') 
            ? 
              this.api.postRequest('email/contact', notify)
                .then(data => {
                  console.log(data)
                  if (data.message === 'OK') {
                    this.submit = true;
                    this.registerForm.reset();
                    setTimeout(() => {
                      this.submit = false;
                      alert("Application Successeful, you will get a notification email!");
                    }, 8000);
                  }
                })
                .catch(err => console.log(err))
            : 
              console.log("Not succesful");
        })
        .catch(err => console.log(err))
  }

  notifyApplicant(data) {

  }

}
