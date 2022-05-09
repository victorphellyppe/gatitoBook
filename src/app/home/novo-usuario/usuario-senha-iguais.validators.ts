import { FormGroup } from "@angular/forms";

export function usuarioSenhaIguaisValidators(formGroup: FormGroup){
  const username = formGroup.get('userName')?.value ?? '';//se for undifened retorna vazio
  const password = formGroup.get('password')?.value ?? '';

  if(username.trim() + password.trim()) {
    return username !== password ? null : { senhaIgualUsuario:true}
  } else {
    return null;
  }
}
