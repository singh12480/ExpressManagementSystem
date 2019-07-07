import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { signupData } from './register/signup.model';
import { loginData } from './login/login.model';
import { Subject } from 'rxjs';

@Injectable()
export class authenticateService{

    private tokenTimer:any;
    private token:string;
    private tokenStatus = new Subject<boolean>();
    private authenticate = false;

  

    constructor(private http:HttpClient,
                 private router: Router){}

    getToken(){ return this.token; };

    getTokenStatus(){
            return this.tokenStatus.asObservable();
        }

    getAuthenticate(){
        return this.authenticate;
    }

   

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.authenticate = true;
          this.setAuthTimer(expiresIn / 1000);
          this.tokenStatus.next(true);
        }
      }

      private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }

      private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        
      }

      private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        
      }

      private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        
        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate),
        
        }
      }

    register(fn:string,ln:string,email:string,pwd:string){
        console.log('new user..')
        const signupData:signupData = { firstName:fn,lastName:ln,email:email,password:pwd};
        console.log("userdata => "+signupData);
        console.log("inside service...")
        this.http.post<{message:string,result:any}>("http://localhost:4000/api/register",signupData)
                .subscribe(res=>{
                    console.log("inside http...")
                    console.log(res.message);
                    console.log(res.result);
                    this.router.navigate(['/login'])
                })
    }

    login(email1:string,password:string){
        console.log("inside login service...");
        
        const loginData:loginData = {email:email1,password:password};
        console.log(loginData)
        this.http.post<{message:string,token:any,expiresIn:number}>("http://localhost:4000/api/login",loginData)
                .subscribe(res=>{
                    console.log("inside login http...");
                    console.log(res.message);   
                    const token = res.token;                 
                    this.token = token;
                    // this.tokenStatus.next(true)
                    
                    console.log(this.token);
                    if(this.token){
                        const expireDuration = res.expiresIn;
                        this.tokenTimer = setTimeout(() => {
                           this.logout() 
                        }, expireDuration*1000);
                        
                        this.authenticate = true;
                        
                        this.tokenStatus.next(true);
                        
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expireDuration * 1000);
                        console.log(expirationDate);
                        this.saveAuthData(this.token, expirationDate);
                        
                        this.router.navigate(['/'])
                    }
                })
    }

    logout(){
        this.token = null;
        this.authenticate = false;
        this.tokenStatus.next(false);
        
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/'])
    }

}