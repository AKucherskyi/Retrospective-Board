import { SnackBarService } from './../shared/snack-bars/snack-bar.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  name: string | null = 'Anonymous';

  constructor(
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.auth.username$.subscribe((name) => {
      this.name = name;
    });

    if (localStorage.getItem('username')) {
      this.name = localStorage.getItem('username');
    }

    this.route.queryParams.subscribe((params: Params) => {
      if (params['authFailed']) {
        this.snackBarService.openSnackBar('AUTH');
        this.router.navigate(['/board']);
      }
    });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.auth.logout();
    this.auth.username$.next('Anonymous');
    this.router.navigate(['/login']);
  }
}
