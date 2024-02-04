import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private router: Router,
    private Storage: Storage) { }

  async canActivate() {
    const introShow = await this.Storage.get('isIntroShow');
    console.log('introShow:', introShow);
    if(introShow===true){      
      return true;
    }else{
      this.router.navigateByUrl('menu/intro');
      return false;
    }    
    }
    
  }

