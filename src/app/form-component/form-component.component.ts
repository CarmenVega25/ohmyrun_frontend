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


  ngOnInit(): void {
  }

}

