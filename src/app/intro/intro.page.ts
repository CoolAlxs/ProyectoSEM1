import { Component, NgModule } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage{

  constructor(private navCtrl: NavController) {}

  irAHome() {
    this.navCtrl.navigateBack('/home');
  }

}
