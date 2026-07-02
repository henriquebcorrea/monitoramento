import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/board']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
