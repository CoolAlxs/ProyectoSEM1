import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
  },
  {
    path: '',
    redirectTo: 'menu/intro',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'menu/intro',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
