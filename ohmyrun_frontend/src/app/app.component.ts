import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
// import { styles } from './mapstyles';
// import * as dotenv from 'dotenv';
// dotenv.config();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ohmyrun_frontend';

  // private map: google.maps.Map

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'API'
    })

    loader.load().then(() => {
      console.log('loaded gmaps')
     
      // const location = {
      //   lat: 50.684855,
      //   lng: 122.337323
      // }
      if(!navigator.geolocation) {
        console.log("location is not supported")
      } 
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
        const location = {
          lat: position.coords.latitude, lng: position.coords.longitude
        }
        new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: location,
          zoom: 15,
        })
        });
    })
}}
