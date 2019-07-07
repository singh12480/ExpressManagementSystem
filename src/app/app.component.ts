import { Component, OnInit } from '@angular/core';
import { authenticateService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EMS';

  constructor(private authenticateUser: authenticateService){}

  ngOnInit(){
    this.authenticateUser.autoAuthUser();
  }
}
