import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../app/_model/Formulario';
import { Marca } from '../app/_model/Marca';


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
  map: google.maps.Map;
  location: google.maps.LatLng;
  markers: Marca[] = [];
  infoWindow: google.maps.InfoWindow;
  mapMarkers: any = [];


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
      apiKey: 'AIzaSyD_rpFGfqEPwCj-WYoFMRXse8QZdCheJEI',
    });

    loader.load().then(() => {
      
      if (!navigator.geolocation) {
        
      }
      navigator.geolocation.getCurrentPosition((position) => {
        
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          {
            center: location,
            zoom: 15,
          }
        );
        this.displayMessage();
        
        this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
          document.querySelector('#formelements')?.scrollIntoView()
          
          if (event.latLng) {
            this.latitude = event.latLng.lat(),
            this.longitude = event.latLng.lng();
            // document.querySelector('#formelements')?.scrollIntoView()
            this.habilitarMensaje = true;
            this.addMarker(event.latLng, this.map);
          }
        
        });
      });
    this.getMarkers();
    this.renderMarkers();
    });

  }
  selectedMarker: any;

  setSelectedMarker(marker: google.maps.Marker) {
    this.selectedMarker = marker;
  }

  guardar() {
    this.saveMarkers();
  }

  addMarker(location: google.maps.LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    marker.addListener('click', () => {
      this.setSelectedMarker(marker);
    });
  }

  displayMessage() {
    this.infoWindow = new google.maps.InfoWindow();
        for (let i of this.markers){
        const position = new google.maps.LatLng(i.latitude, i.longitude);

        const tempMarker = new google.maps.Marker({position: position, map: this.map});
          tempMarker.addListener('click',((tempMarker, map, infoWindow) => {
        return () => {
        infoWindow.setContent('<p><b>Description</b> : ' + i.description +'</p>');
        infoWindow.open(map, tempMarker);
        }
        })(tempMarker, this.map, this.infoWindow));
        this.mapMarkers.push(tempMarker);
        }
  }

  saveMarkers() {
    const markerJson = {
      latitude: this.latitude,
      longitude: this.longitude,
      description: this.formulario.mensaje,
    };
    this.habilitarMensaje = false;
    this.formulario.mensaje = "";

    this.http.post('https://oh-my-run.herokuapp.com/pin', markerJson).subscribe({
      next: 
      (data) => {
        this.getMarkers();
        this.renderMarkers();
      } ,
      error: (error) => {
        console.error(
          'An error occurred while saving the markers to the database: ',
          error
        );
        this.getMarkers();
        
      }
    });
  }
  getMarkers() {
    this.http.get('https://oh-my-run.herokuapp.com/pin').subscribe({
      next: (data) => {
        this.markers = Array.prototype.slice.call(data)
        this.renderMarkers();
        this.displayMessage();
      },
      error: (error) => {
        console.error(
          'An error occurred while retrieving the markers from the database: ',
          error
        );
      },
    });

  }

  renderMarkers() {
    this.markers.forEach((marker) => {
      const position = new google.maps.LatLng(marker.latitude, marker.longitude);
      const newMarker = new google.maps.Marker({
        position: position,
        map: this.map,
      });
      newMarker.addListener('click', () => {
        this.setSelectedMarker(newMarker);
      });
    });
  }
}
