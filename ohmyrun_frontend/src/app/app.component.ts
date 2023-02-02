import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { HttpClient } from '@angular/common/http';
import { FormComponentComponent } from './form-component/form-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ohmyrun_frontend';
  
  markers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'API'
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
          const markerJson = {
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
          }
          console.log(markerJson);
          this.markers.push(JSON.stringify(markerJson));
          this.addMarker(event.latLng, map);
          }
        });
      });
    });
  }
  selectedMarker: any;

  setSelectedMarker(marker: any) {
    this.selectedMarker = marker;
}
  guardar(marker: any) {
    console.log('Marker submitted:', marker);

  // Perform any desired actions with the submitted marker data
}


  addMarker(location: google.maps.LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    marker.addListener('click', () => {
      this.setSelectedMarker(marker);
    });
    console.log(marker);
    console.log(this.markers);
  }

  saveMarkers() {
       // Code to save the markers to a database or local storage.
       this.http.post('http://127.0.0.1:5000/pin', this.markers).subscribe({
        next: (data) => {
          console.log('Successfully saved the markers to the database');
      
        },
        error: (error) => {
          console.error('An error occurred while saving the markers to the database: ', error);
        }
        }
      );
  }
  getMarkers() {
    this.http.get('http://127.0.0.1:5000/pin')
  }
} 
