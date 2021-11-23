import { AuthService } from './../auth/auth.service';
import { SnackBarService } from './../shared/snack-bars/snack-bar.service';
import { PostService } from '../shared/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateColumnComponent } from '../column/create-column/create-column.component';
import * as XLSX from 'xlsx';
import { Column } from '../shared/interfaces';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  name!: string;
  @Input() columns!: Column[]

  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private snackBarService: SnackBarService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
  }

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

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'RetroBoard.xlsx');
  }
}
