import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SnackBarAuthComponent } from '../shared/snack-bars/snack-bar-auth/snack-bar-auth.component';

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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.auth.username$.subscribe((name) => {
      this.name = name
    })

    if (localStorage.getItem('email')) {
      this.name = localStorage.getItem('email')
    }

    this.route.queryParams.subscribe((params: Params) => {
      if (params['authFailed']) {
        this.openSnackBar()
        this.router.navigate(['board'])
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.auth.username$.next('Anonymous')
    this.router.navigate(['/login']);
  }

  openSnackBar(): void {
    this._snackBar.openFromComponent(SnackBarAuthComponent, {
      duration: 5000,
    });
  }
}
