import { Column } from './../shared/interfaces';
import { PostService } from './../shared/post.service';
import { Component, OnInit } from '@angular/core';

/**
 * @title Drag&Drop connected sorting group
 */
@Component({
  selector: 'app-board-page',
  templateUrl: 'board-page.component.html',
  styleUrls: ['board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  columns!: Column[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getColumns().subscribe((columns) => {
      this.columns = columns;
    });

    this.postService.invokeColumnCreation.subscribe((column) => {
      console.log(column)
      this.createColumn(column)
    })
  }

  createColumn(column: Column) {
    this.columns.push(column)
  }

  updateColumns() {
    this.postService.updateColumns(this.columns).subscribe(() => {
      console.log('updated');
      
    })
  }

  deleteColumn(id: string) {
    this.postService.deleteColumn(id).subscribe(() => {
      this.columns = this.columns.filter((column) => column.id != id);
    });
  }
}
