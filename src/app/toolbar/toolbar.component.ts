import { AuthService } from './../auth/auth.service';
import { SnackBarService } from './../shared/snack-bars/snack-bar.service';
import { PostService } from '../shared/post.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateColumnComponent } from '../column/create-column/create-column.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  name!: string;

  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private snackBarService: SnackBarService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    if (this.postService.numberOfColumns >= 5) {
      this.snackBarService.openSnackBar('COLUMNS');
      return;
    } else if (!this.auth.isAuthenticated()) {
      this.snackBarService.openSnackBar('AUTH');
      return;
    } else {
      const dialogRef = this.dialog.open(CreateColumnComponent, {
        width: '350px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.postService.createColumn(result).subscribe((column) => {
            this.postService.invokeColumnCreation$.next(column);
          });
        }
      });
    }
  }
}
