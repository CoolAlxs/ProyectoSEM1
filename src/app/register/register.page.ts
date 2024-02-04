import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { Usuario } from '../services/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value === confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors(null);
    } else {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    }
  }

  validation_Message = {
    email: [
      { type: "required", message: "El Email es obligatorio." },
      { type: "email", message: "El Email ingresado no es válido." },
      { type: "minlength", message: "El Email ingresado es muy corto." }
    ],
    password: [
      { type: "required", message: "El password es obligatorio." },
      { type: "minlength", message: "El password debe ser mayor a 8 caracteres." },
      { type: "pattern", message: "El password debe tener una Mayúscula, Minúscula, Numeros, un carácter especial(@$!%*?&)." },
    ],
    confirmPassword:[
      { type: "required", message: "Confirma la Password." },
      { type: "passwordMismatch", message: "Las contraseñas no coinciden." }
    ],
    name:[
      { type: "required", message: "El nombre es obligatorio." },
    ],
    lastName:[
      { type: "required", message: "El nombre es obligatorio." },
    ],
  }

  registerMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private navcontrol: NavController,
    private storage: Storage,
    private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
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
      ),
      confirmPassword: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          
        ])
      ),
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      lastName: new FormControl(
        "",
        Validators.compose([
          Validators.required,          
        ])
      )
    }, { validators: this.passwordMatchValidator }); 
  }
  
  ngOnInit() {
  }
  

  register(register_data: any) {
    console.log(register_data);
  
    this.authService.registrarUsuario(register_data).then((nuevoUsuario: Usuario) => {
      if (nuevoUsuario && nuevoUsuario.email) {
        this.registerMessage = `Usuario registrado con éxito: ${nuevoUsuario.email}`;
      } else {
        this.registerMessage = 'Usuario registrado con éxito';
      }
  
      this.storage.set('userRegisterIn', true);
      
    }).catch((error) => {
      this.registerMessage = `Error al registrar usuario: ${error}`;
      this.authService.errorMensaje = '';
    });
  }

  irLogin(){
    this.navcontrol.navigateForward("menu/login");
  }
}
