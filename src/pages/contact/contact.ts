import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    @ViewChild("map") mapElement;

    map: any;
    potholes: pothole[];
    lat: any;
    long:any;
    my_marker:any;
    url = 'http://127.0.0.1:8000/potholes/nearby/';

  constructor(public navCtrl: NavController,public http:HttpClient, private geolocation: Geolocation) 
  {
  }

    ngOnInit(){
    this.initMap();
    }

    meInMap(){
        let coords = new google.maps.LatLng(this.lat,this.long);

        let mapOptions: google.maps.MapOptions = {
          center: coords,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

        this.my_marker = new google.maps.Marker({
            map: this.map,
            label: "Me",
            position: coords
        })
    }

    getPotholes(my_marker){
        this.http.get(this.url+this.lat+'/'+this.long+'/').subscribe((potholes: pothole[])=> {
            this.potholes = potholes
            console.log(this.potholes);
            var marker;
            var t =0;
            for (var i = this.potholes.length - 1; i >= 0; i--) {
                t=t+0.01;
                console.log(parseFloat(this.potholes[i].lat), parseFloat(this.potholes[i].long) )
                marker = new google.maps.Marker({
                    map: this.map,
                    // label: this.potholes[i].id.toString(),
                    position: new google.maps.LatLng(parseFloat(this.potholes[i].lat), parseFloat(this.potholes[i].long)),
                    icon: 'http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png'
                  })
                marker.addListener('click', function() {
                    this.map.setZoom(18);
                    this.map.setCenter(my_marker.getPosition());
                });
                my_marker.addListener('click', function() {
                    this.map.setZoom(18);
                    this.map.setCenter(my_marker.getPosition());
                });
            }
        },
        (err)=>{
          console.log(err);
        });
    }
    initMap(){
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log(resp.coords.latitude);
            this.lat = resp.coords.latitude;
            console.log(resp.coords.longitude);
            this.long = resp.coords.longitude;
            this.meInMap();
            this.getPotholes(this.my_marker);
            })
        .catch((error) => {
                console.log('Error getting location', error);
        }); 

        this.lat = "13.555227";
        this.long = "80.0249917";
    }

}
interface pothole{
    'added_on': "",
    'danger_level': 0.0,
    'id': 0,
    'img': "",
    'img_with_potholes': "",
    'lat': "",
    'long': "",
    'user_feedback': ""
}

