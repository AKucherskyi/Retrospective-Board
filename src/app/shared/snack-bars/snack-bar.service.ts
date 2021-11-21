import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarAuthComponent } from './snack-bar-auth/snack-bar-auth.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

export type SnackBarError = 'AUTH' | 'COLUMNS'

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(error: SnackBarError): void {
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
