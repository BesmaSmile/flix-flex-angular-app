import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '@/app/components/button/button.component';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormFieldComponent } from '@/app/components/form-field/form-field.component';
import { NotificationService } from '@/app/services/notification.service';
import { AuthService, LoginPayload } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormFieldComponent, ButtonComponent],
  templateUrl: './login.component.html',

})
export class LoginComponent {
  loginForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,

  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // pour afficher les erreurs
      return;
    };

    this.submitting = true;
    const payload: LoginPayload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (response) => {
        console.log('Logged in successfully', response);
        this.submitting = false;
        // Rediriger après login
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.submitting = false;
        this.notificationService.showError('Error', err.message);
      }
    });
  }
}
