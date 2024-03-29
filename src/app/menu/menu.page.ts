import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navcontrol: NavController
  ) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.close();
  }

  goHome() {
    this.navcontrol.navigateForward("menu/home");
  }

  goIntro() {
    this.navcontrol.navigateForward("menu/intro");
  }
  goRegister(){
    this.navcontrol.navigateForward("menu/register");

  }
  logOut() {    
    this.navcontrol.navigateForward("menu/login");
  }
}
