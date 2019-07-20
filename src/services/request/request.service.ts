import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'https://projects.thealmondmedia.com/prosper/hrms/api/';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  token = '';

  constructor(private http: HttpClient) { 
    this.setJWT();
   }

  getJWT() {
      return this.http.get(url + 'authorise');
  }

  setJWT() {
    if (this.token !== '') {
      return;
    }

    this.getJWT().subscribe(
      data => {
        console.log(data);
        sessionStorage.setItem('x-t', data['response'].jwt);
        this.token = 'Bearer ' + sessionStorage.getItem('x-t');
        console.log(this.token);
    });
  }

  getAllJobs() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.token
      })
    };

    return this.http.get(url + 'jobs', httpOptions);
  }

  registerForEvent(dat) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.token
      })
    };

    return this.http.post(url + 'events/apply', dat, httpOptions);
  }

  notifyEmail(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.token
      })
    };

    return this.http.post(url + 'email/notify', data, httpOptions);
  }

  postRequest = (routes: string, data) => 
  {
    try
    {
      return fetch(url + routes, {
          method: "POST",
          headers: {
            "cache-control": "no-cache",
            "Accept-language": "en",
            "Authorization": "Bearer " + sessionStorage.getItem('x-t')
          },
          mode: "cors",
          cache: "no-cache", 
          credentials: "same-origin", 
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: data, // body data type must match "Content-Type" header
      })
      .then(response => response.json()) // parses response to JSON
      .catch(error => error);
    }
    catch(ex)
    {
      return ex;
    }
  };
}
