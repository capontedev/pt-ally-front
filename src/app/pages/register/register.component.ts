import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  success = false;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group(
      {
        full_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(125)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(125)]],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(125)],
        ],
      },
      {
        validators: this.passwordMatchValidator('password', 'confirmPassword'),
      },
    );
  }

  passwordMatchValidator(pass1: string, pass2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control) {
        const pass1Control = control.get(pass1);
        const pass2Control = control.get(pass2);

        if (pass1Control?.value === pass2Control?.value) {
          pass2Control?.setErrors(null);
        } else {
          pass2Control?.setErrors({ passwordMismatch: true });
        }
      }

      return null;
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.errors = {};

      const userData = {
        full_name: this.registerForm.get('full_name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.userService.createUser(userData).subscribe({
        next: () => {
          this.success = true;
          this.isSubmitting = false;
          setTimeout(() => {
            this.router.navigate(['/dashboard/weather']);
          }, 2000);
        },
        error: error => {
          this.isSubmitting = false;
          if (error.error?.message) {
            this.errors.general = error.error.message;
          } else {
            this.errors.general = 'Error al registrar usuario';
          }
        },
      });
    } else {
      this.validateForm();
    }
  }

  private validateForm() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control?.errors) {
        this.errors[key] = this.getErrorMessage(key, control.errors);
      }
    });
  }

  private getErrorMessage(field: string, errors: any): string {
    if (errors.required) return 'Este campo es requerido';
    if (errors.email) return 'Email inválido';
    if (errors.minlength) return `Mínimo ${errors.minlength.requiredLength} caracteres`;
    if (errors.maxLength) return `Máximo ${errors.minlength.requiredLength} caracteres`;
    if (errors.passwordMismatch) return 'Las contraseñas no coinciden';
    return 'Campo inválido';
  }
}
