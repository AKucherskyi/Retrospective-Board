import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarAuthComponent } from './snack-bar-auth/snack-bar-auth.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';


@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(error: string): void {
    switch (error) {
      case 'AUTH':
        this._snackBar.openFromComponent(SnackBarAuthComponent, {
          duration: 5000,
        });
        break;
      case 'COLUMNS':
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 5000,
        });
        break;
    }
  }
}
