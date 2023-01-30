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
      apiKey: 'MYKEY'
    })

    loader.load().then(() => {
      console.log('loaded gmaps')

      const location = { lat: 47.685128247952946, lng: -122.33719484786576}

      new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: location,
        zoom: 6,
      })
    })
  }
}
