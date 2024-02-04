import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  usuarioRegistrado: any[] = [];
  errorMensaje: string = '';

  constructor() { }

  loginUser(credential: any) {
    return new Promise<string>((resolve, reject) => {
      const usuarioEncontrado = this.usuarioRegistrado.find((usuario) =>
        usuario.email === credential.email && usuario.password === credential.password
      );

      if (usuarioEncontrado) {
        resolve('Login Correcto');
        console.log("Login Correcto")
      } else {
        this.errorMensaje = 'Email o contraseña incorrectos';
        reject(this.errorMensaje);
      }
    });
  }

  registrarUsuario(credential: any) {
    return new Promise<Usuario>((resolve, reject) => {
      const correoExistente = this.usuarioRegistrado.some((usuario) => usuario.email === credential.email);

      if (correoExistente) {
        this.errorMensaje = 'El correo ya está registrado';
        reject(this.errorMensaje);
      } else {
        const nuevoUsuario: Usuario = {
          email: credential.email,
          password: credential.password,
          nombre: credential.name,
          apellido: credential.lastName,
        };
        console.log(this.usuarioRegistrado);
        this.usuarioRegistrado.push(nuevoUsuario);
        resolve(nuevoUsuario);
      }
    });
  }
  
}
