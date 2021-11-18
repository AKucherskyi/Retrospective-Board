import { PostService } from './../shared/post.service';
import { Column, Post } from './../shared/interfaces';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {

  constructor (private postService: PostService) {

  }

  @Input() column!: Column;
  @Output() onDel: EventEmitter<string> = new EventEmitter()
  @Output() onDrop: EventEmitter<string> = new EventEmitter()

  deleteColumn(id: string) {
    this.onDel.emit(id)
  }

  drop(event: CdkDragDrop<Post[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } 
    this.onDrop.emit()
  }

}
