import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FormFieldComponent } from '@/app/components/form-field/form-field.component';
import { RegisterPayload, UserService } from '@/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '@/app/services/notification.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, FormFieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private toastr: ToastrService,) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // pour afficher les erreurs
      return;
    }

    this.submitting = true;

    const payload: RegisterPayload = this.registerForm.value;

    this.userService.register(payload).subscribe({
      next: (response) => {
        console.log('Registered successfully', response);
        this.submitting = false;
        this.notificationService.showSuccess('Success', 'Registration successful, please login');
        // Rediriger après l'inscription
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.submitting = false;
        this.notificationService.showError('Error', err.message);
      }
    });
  }
}
