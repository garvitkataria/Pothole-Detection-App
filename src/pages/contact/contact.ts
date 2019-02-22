import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	@ViewChild("map") mapElement;
  map: any;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    this.initMap();
  }

initMap(){

    let coords = new google.maps.LatLng(13.5566268,80.0249917);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords
    })

  }

}
