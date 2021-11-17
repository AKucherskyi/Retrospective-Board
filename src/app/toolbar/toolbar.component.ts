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

  constructor(public dialog: MatDialog, private postService: PostService) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateColumnComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.postService.createColumn(result);
    });
  }
}
