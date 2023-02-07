import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../_model/Formulario';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})

export class FormComponentComponent implements OnInit {

  formulario: Formulario = new Formulario();

  form: FormGroup;
  @Input() marker: any;

  // constructor(private formBuilder: FormBuilder) {
  //   this.buildForm();
  //  }

  //  private buildForm(){
  //   this.form = this.formBuilder.group({
  //     mensaje: ['', [Validators.required, Validators.maxLength(100)]],
  //   });
  // }

  ngOnInit(): void {
  }

  guardar() {
    console.log('marca', this.marker);
    console.log('Formulario', this.formulario);

  }
}

