import { PostService } from './../shared/post.service';
import { Component, OnInit } from '@angular/core';
import { Column } from '../shared/interfaces';

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
    this.postService.getColumns().subscribe(columns => {
      this.columns = columns
    })
  }

  deleteColumn(id: string) {
   this.columns = this.columns.filter(column => column.id != id)
   this.postService.deleteColumn(id)
   console.log(this.columns)
  }
  
}
