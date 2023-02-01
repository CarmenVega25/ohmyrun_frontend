import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../_model/Formulario';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
//   template: `
//   <form (ngSubmit)="onSubmit()">
//     <textarea [(ngModel)]="message" name="message"></textarea>
//     <button type="submit">Submit</button>
//   </form>
// `
})

export class FormComponentComponent implements OnInit {

  formulario: Formulario = new Formulario();

  form: FormGroup;
  @Input() marker: any;
  // message = '';

  // onSubmit() {
  //   // Call a service to save the message or send it to an API
  //   console.log(this.message);
  // }
 // @Output() submit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

   private buildForm(){
    this.form = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
  }

  guardar() {
    console.log('marca', this.marker);
    console.log('Formulario', this.formulario);

    //Aqui deberían consumir su servicio
   // this.submit.emit(this.marker);
  }
}

