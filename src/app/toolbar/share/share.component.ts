import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from './../../shared/snack-bars/snack-bar.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  url: string = document.URL;

  constructor(
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) {}

  copy() {
    navigator.clipboard
      .writeText(this.url)
      .then(() => {
        this.snackBarService.openSnackBar('COPY');
        this.dialog.closeAll();
      })
      .catch((error) => {
        alert(`Copy failed! ${error}`);
      });
  }
}
