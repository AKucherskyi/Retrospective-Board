import { SnackBarComponent } from '../shared/snack-bars/snack-bar/snack-bar.component';
import { PostService } from '../shared/post.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateColumnComponent } from '../column/create-column/create-column.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openSnackBar(): void {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
    });
  }

  openDialog(): void {
    if (this.postService.numberOfColumns >= 5) {
      this.openSnackBar();
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
