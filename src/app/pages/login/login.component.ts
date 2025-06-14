import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(125)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errors = {};

      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/weather']);
        },
        error: error => {
          this.isSubmitting = false;
          if (error.error?.message) {
            this.errors.general = error.error.message;
          } else {
            this.errors.general = 'Error al iniciar sesión';
          }
        },
      });
    } else {
      this.validateForm();
    }
  }

  private validateForm() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control?.errors) {
        this.errors[key] = this.getErrorMessage(key, control.errors);
      }
    });
  }

  private getErrorMessage(field: string, errors: any): string {
    if (errors.required) return 'Este campo es requerido';
    if (errors.email) return 'Email inválido';
    if (errors.minlength) return `Mínimo ${errors.minlength.requiredLength} caracteres`;
    return 'Campo inválido';
  }
}
