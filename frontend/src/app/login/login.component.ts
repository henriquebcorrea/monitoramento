import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials, RegisterCredentials } from '../../models/user';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Kanban Board</h1>
        
        <div class="tabs">
          <button (click)="isLogin = true" [class.active]="isLogin">Login</button>
          <button (click)="isLogin = false" [class.active]="!isLogin">Register</button>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" *ngIf="isLogin">
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" required>
          </div>
          <button type="submit" [disabled]="loginForm.invalid || loading">
            {{ loading ? 'Loading...' : 'Login' }}
          </button>
          <p class="error" *ngIf="error">{{ error }}</p>
        </form>

        <form [formGroup]="registerForm" (ngSubmit)="onRegister()" *ngIf="!isLogin">
          <div class="form-group">
            <label>Username</label>
            <input type="text" formControlName="username" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" required>
          </div>
          <button type="submit" [disabled]="registerForm.invalid || loading">
            {{ loading ? 'Loading...' : 'Register' }}
          </button>
          <p class="error" *ngIf="error">{{ error }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      color: #667eea;
      margin-bottom: 30px;
    }

    .tabs {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }

    .tabs button {
      flex: 1;
      padding: 12px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 16px;
      color: #666;
      transition: all 0.3s;
    }

    .tabs button.active {
      color: #667eea;
      border-bottom: 2px solid #667eea;
      margin-bottom: -2px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    button[type="submit"] {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button[type="submit"]:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    button[type="submit"]:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error {
      color: #e74c3c;
      text-align: center;
      margin-top: 15px;
      font-size: 14px;
    }
  `]
})
export class LoginComponent {
  isLogin = true;
  loading = false;
  error: string | null = null;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    const credentials: LoginCredentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/board']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Login failed';
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.error = null;

    const credentials: RegisterCredentials = this.registerForm.value;

    this.authService.register(credentials).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/board']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Registration failed';
      }
    });
  }
}
