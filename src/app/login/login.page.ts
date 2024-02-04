import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  
  validation_Message = {
    email:[
      {type: "required", message:"El Email es obligatorio."},
      {type: "email", message:"El Email ingresado no es válido."},
      {type: "minlength", message:"El Email ingresado es muy corto."}
    ],
    password:[
      {type: "required", message:"El password es obligatorio."},
      {type: "minlength", message:"El password debe ser mayor a 8 caracteres."},
      {type: "pattern", message:"El password debe tener una Mayúscula, Minúscula, un carácter especial(@$!%*?&)."},
    ]
  }

  loginMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navcontrol: NavController,
    private storage: Storage) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(9)
        ])
      ), 
      
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
          )
        ])
      )
    });
  }


  loginUser(credential: any) {
    this.authService.loginUser(credential).then((response) => {
      // Login exitoso
      this.loginMessage = response;
      this.storage.set('userLoggedIn', true);
      this.navcontrol.navigateForward("menu/home");
    }).catch((error) => {
      // Error en el login
      this.loginMessage = `Error al iniciar sesión: ${error}`;
      this.authService.errorMensaje = ''; // Limpiar el mensaje de error
    });
  }

  ngOnInit() {
  }

}

