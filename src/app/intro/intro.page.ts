import { Component, NgModule } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  event_list:any;

  constructor(
    private navcontrol: NavController,
    private storage: Storage,
    private events: EventsService
  ) { }

  ionViewDidEnter(){
    this.events.getEvents().then(
      res=>{
        this.event_list=res;
        console.log(this.event_list);
      }
    );      
}

  irAHome() {
    this.navcontrol.navigateForward("menu/home");
    this.storage.set('isIntroShow', true);
  }

}
