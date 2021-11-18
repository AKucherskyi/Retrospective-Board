import { PostService } from './../shared/post.service';
import { Column, Post } from './../shared/interfaces';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({ opacity: 1}),
          animate('100ms', style({ opacity: 0}))
        ])
      ]
    )
  ],
})
export class ColumnComponent implements OnInit {

  showTextarea: boolean = false
  newPostText: string = ''
  form!: FormGroup

  @Input() column!: Column;
  @Output() onDel: EventEmitter<string> = new EventEmitter()
  @Output() onDrop: EventEmitter<string> = new EventEmitter()

  constructor (private postService: PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required)
    })
  }


  deleteColumn(id: string) {
    this.onDel.emit(id)
  }


  createPost() {
    let post: Post = {
      text: this.form.controls['text'].value
    }

    this.showTextarea = false

    this.postService.createPost(post, this.column.id, this.column.posts.length).subscribe(() => {
      this.form.reset() 
      this.column.posts.unshift(post)
    })
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
