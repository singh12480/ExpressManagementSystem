import { Injectable } from "@angular/core";
import {CanActivate} from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authenticateService } from '../auth.service';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private authenticateService:authenticateService,private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean>|Promise<boolean>{
        const authenticated = this.authenticateService.getAuthenticate();
        if(!authenticated){
            this.router.navigate(['/login']);
        }
        return authenticated;
    }
}