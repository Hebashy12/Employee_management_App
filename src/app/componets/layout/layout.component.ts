import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  authService = inject(AuthServiceService);
  router = inject(Router);

  user: any;

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
