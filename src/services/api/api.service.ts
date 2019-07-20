import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService 
{
  jwt:string = null;
  headers:any = null;
  url = 'https://projects.thealmondmedia.com/prosper/hrms/api/';
  // url = '//localhost:8888/almondcareers/authenticdoc/api/';
  constructor(private router: Router) 
  { 
    this.jwt = sessionStorage.getItem("token");
    this.checkForJwt();
  }

  getUserData = () => {
    if(sessionStorage.getItem("userdata")) {
      this.getRequest("institutions/" + sessionStorage.getItem("instname") + '/accounts/auth/' + JSON.parse(sessionStorage.getItem("userdata")).email)
      .then((res) => {
        // sessionStorage.setItem("userdata", JSON.stringify(res.response));
      })
      .catch((err) => {
        sessionStorage.clear();
        this.router.navigateByUrl("/Login");
      });
    }
  }

  checkForJwt = () =>
  {
    if(!sessionStorage.getItem('token'))
    {
      this.getRequest("authorise")
      .then((res:any) => {
        sessionStorage.setItem("token", res.response.jwt);
        this.jwt = res['response']['jwt'];
        window.location.reload();
      })
      .catch((err:any) => err)
    }
  }

  getRequest = (routes:string) => 
  {
    try
    {
    // Default options are marked with *
      return fetch(this.url + routes, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
          "Authorization": "Bearer " + this.jwt
        },
        credentials: 'same-origin'
      })
      .then(response => response.json()) // parses response to JSON
      .catch(error => error);
    }
    catch(ex)
    {
      console.info(ex);
      return ex;
    }
  }

  postRequest = (routes: string, data) => 
  {
    try
    {
      return fetch(this.url + routes, {
          method: "POST",
          headers: {
            "cache-control": "no-cache",
            "Accept-language": "en",
            "Authorization": "Bearer " + this.jwt
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

  transformRequest(obj)
  {
      var $res = [];
      for(var key in obj)
      {
          $res.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return $res.join('&');
  }

  updateRequest = (routes: string, data) => 
  {
    try
    {
      data = this.transformRequest(data);
      return fetch(this.url + routes, {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "Accept-language": "en",
            "Authorization": "Bearer " + this.jwt
          },
          mode: "cors",
          cache: "no-cache", 
          credentials: "same-origin", 
          body: data, // body data type must match "Content-Type" header
      })
      .then(response => response.json()) // parses response to JSON
      .catch(error => error);
    }
    catch(ex)
    {
      return ex;
    }
  }

  deleteRequest = (routes: string) => 
  {
    try
    {
      return fetch(this.url + routes, {
        method: 'delete',
        headers: {
          "cache-control": "no-cache",
          "Accept-language": "en",
          "Authorization": "Bearer " + this.jwt
        },
      })
      .then(response => response.json()) // parses response to JSON
      .catch(error => error);
    }
    catch(ex)
    {
      return ex;
    }
  }
}
