import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { IntroGuard } from '../guards/intro.guard';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),        
      },
      {
        path: 'intro',
        loadChildren: () => import('../intro/intro.module').then(m => m.IntroPageModule),
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule),
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule),
      },      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
