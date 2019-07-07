import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { authenticateService } from '../auth.service';


@Injectable()

export class intercepting implements HttpInterceptor{
    constructor(private serviceAuthenticated:authenticateService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
        const authenticated_token = this.serviceAuthenticated.getToken();
        console.log('inside inteceptor service...')
        console.log(authenticated_token);
        const authenticated_request = req.clone({
            headers:req.headers.set("Authorization","Bearer "+ authenticated_token)
        });
        return next.handle(authenticated_request);
    }

    
}