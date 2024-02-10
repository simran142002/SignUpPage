import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../app/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}
  verifyOtp: boolean = false;
  title = 'sign';
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  showPassword:boolean = false;

  signup() {
    this.apiService.signup(this.user).subscribe(
      response => {
        this.router.navigate(['/verify-otp']);
        this.verifyOtp = true;
      },
      error=> {
        console.error(error);
      }
    );
  }

  togglePasswordVisibility(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    const buttonElement = document.querySelector(`#${inputId} + button`);
  
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
      if (buttonElement) {
        this.showPassword = false;
      }
    } else {
      inputElement.type = 'password';
      if (buttonElement) {
        this.showPassword = true;
      }
    }
  }

  isFormValid() {
    return this.user.name && this.user.email && this.user.password && this.user.confirmPassword;
  }
}
