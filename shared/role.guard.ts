import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesapiService } from 'src/app/services/coursesapi.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
constructor(private service:CoursesapiService, private route:Router){}

  canActivate () {
    if(this.service.HaveAccess()){
      return true;

    }
    else{
      return false;
    }
  }

  
  
}
