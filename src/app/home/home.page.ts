import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  event_list:any;
  categoryList:any;
  selectedCategoryId:any;

  constructor(
    private navcontrol: NavController,
    private storage: Storage,
    private events: EventsService
    ) {}

    ionViewDidEnter(){
      this.events.getEvents().then(
        res=>{
          this.event_list=res;
          console.log(this.event_list);
        }
      );

      this.events.getCategories().then((res) => {
        this.categoryList = res;
        console.log("Categorías", this.categoryList);
      }
      );     
  }
  
  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;

    this.events.getCategoryById(categoryId).then(
      category => {
        console.log("Detalles de la categoría", category);
      }
    );
  }

    
  irAIntro() {
    this.navcontrol.navigateBack("menu/intro")    
  }

} 