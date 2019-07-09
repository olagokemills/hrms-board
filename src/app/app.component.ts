import { Component } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { RequestService } from 'src/services/request/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'board';

  constructor(private http: HttpClient, private api: RequestService) {

  }
}
