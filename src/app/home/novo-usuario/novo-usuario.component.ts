import { UsuarioExisteService } from './usuario-existe.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo';
import { NovoUsuarioService } from './novo-usuario.service';
import { NovoUsuario } from './novo-usuario.ts';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioSvc: NovoUsuarioService,
    private usuarioExistenteSvc: UsuarioExisteService
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: [
        '',
        [minusculoValidator],
        [this.usuarioExistenteSvc.usuarioJaexiste()],
      ],
      password: [''],
    });
  }

  cadastrar() {
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log(novoUsuario);
    this.novoUsuarioSvc.cadastraNovoUsuario(novoUsuario);
  }
}
