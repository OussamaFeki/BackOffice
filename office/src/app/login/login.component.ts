import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup ;
  constructor(private authService: AuthService ,private formBuilder: FormBuilder,private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login({ username, password }).subscribe(response => {
        console.log('Logged in successfully:', response);
        // Navigate to the admin interface after successful login
        this.authService.setAuthToken(response.token);
        this.router.navigate(['/interface']);
      });
    }
  }
}
