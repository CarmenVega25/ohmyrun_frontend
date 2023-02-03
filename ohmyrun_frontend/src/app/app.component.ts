import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { HttpClient } from '@angular/common/http';
import { FormComponentComponent } from './form-component/form-component.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../app/_model/Formulario';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  formulario: Formulario = new Formulario();
  form: FormGroup;
  title = 'ohmyrun_frontend';
  latitude: number;
  longitude: number;
  habilitarMensaje: boolean = false;

  markers: any[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'APIKEY',
    });

    loader.load().then(() => {
      console.log('loaded gmaps');

      if (!navigator.geolocation) {
        console.log('location is not supported');
      }
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          {
            center: location,
            zoom: 15,
          }
        );

        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            console.log(event.latLng.lat(), event.latLng.lng());
            this.latitude = event.latLng.lat(),
            this.longitude = event.latLng.lng(),
            this.habilitarMensaje = true;
            this.addMarker(event.latLng, map);
          } 
        });
        this.markers.forEach((marker) => {
          const location = {
            lat: marker.latitude,
            lng: marker.longitude,
          };
          this.addMarker(location, map);
        });
      });
    });
    this.getMarkers();
  }
  selectedMarker: any;

  setSelectedMarker(marker: any) {
    this.selectedMarker = marker;
  }

  guardar() {
    // console.log('marca', this.marker);
    console.log('Formulario', this.formulario);
    this.saveMarkers();
    

    //console.log(markerJson);
   // this.markers.push(JSON.stringify(markerJson));
  //  this.addMarker(event.latLng, map);
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
    const markerJson = {
      latitude: this.latitude,
      longitude: this.longitude,
      description: this.formulario.mensaje
    };

    // Code to save the markers to a database or local storage.
    this.http.post('https://oh-my-run.herokuapp.com/pin', markerJson).subscribe({
      next: (data) => {
        console.log('Successfully saved the markers to the database');
      },
      error: (error) => {
        console.error(
          'An error occurred while saving the markers to the database: ',
          error
        );
      },
    });
  }
  getMarkers() {
    this.http.get('https://oh-my-run.herokuapp.com/pin').subscribe({
      next: (data) => {
        console.log('Successfully retrieved the markers from the database');
        console.log('Data before slice call', data);
        this.markers = Array.prototype.slice.call(data);
        console.log('Data after slice call', data);
        this.renderMarkers(data);
      },
      error: (error) => {
        console.error(
          'An error occurred while retrieving the markers from the database: ',
          error
        );
      },
    });
  }
  renderMarkers(map) {
    this.markers.forEach((marker) => {
      const position = new google.maps.LatLng(marker.latitude, marker.longitude);
      const newMarker = new google.maps.Marker({
        position: position,
        map: map
      });
      newMarker.addListener('click', () => {
        this.setSelectedMarker(newMarker);
      });
    });
  }
  

}
