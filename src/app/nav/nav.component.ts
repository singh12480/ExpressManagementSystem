import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { authenticateService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  
  private tokenStatus:Subscription;
  userAuthenticated = false;

  constructor(private authenticateService:authenticateService,
              private router: Router) { }

  ngOnInit() {
    this.userAuthenticated = this.authenticateService.getAuthenticate();
    this.tokenStatus = this.authenticateService.getTokenStatus()
                        .subscribe(res=>{
                          console.log(res)
                          this.userAuthenticated = res;
                        });
  }

  onLogout(){
    this.authenticateService.logout();
  }

  ngOnDestroy(){
    this.tokenStatus.unsubscribe();
  }

}
