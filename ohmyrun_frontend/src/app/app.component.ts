import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ohmyrun_frontend';

  markers: google.maps.Marker[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'API KEY'
    })

    loader.load().then(() => {
      console.log('loaded gmaps')
     
      if(!navigator.geolocation) {
        console.log("location is not supported")
      } 
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
        const location = {
          lat: position.coords.latitude, lng: position.coords.longitude
        }
        const map = 
        new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: location,
          zoom: 15,
        });

        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
          console.log(event.latLng.lat(), event.latLng.lng());
          this.addMarker(event.latLng, map);
          }
        });
      });
    });
  }

  addMarker(location: google.maps.LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    this.markers.push(marker);
  }

  saveMarkers() {
       // Code to save the markers to a database or local storage.
       this.http.post('http://127.0.0.1:5000/pin', this.markers).subscribe(
        (data) => {
          console.log('Successfully saved the markers to the database');
        },
        (error) => {
          console.error('An error occurred while saving the markers to the database: ', error);
        }
      );
  }
} 
