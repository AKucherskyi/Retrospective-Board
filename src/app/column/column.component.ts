import { ColorService } from './../shared/color.service';
import { Animations } from './../shared/animations';
import { PostService } from './../shared/post.service';
import { Column, Post } from './../shared/interfaces';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  animations: [Animations.enterAnimation],
})
export class ColumnComponent implements OnInit {
  showTextarea: boolean = false;
  newPostText: string = '';
  form!: FormGroup;
  color!: string;

  @Input() column!: Column;
  @Output() onDel: EventEmitter<string> = new EventEmitter();
  @Output() onDrop: EventEmitter<string> = new EventEmitter();

  constructor(
    private postService: PostService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
    });

    this.color = this.colorService.getColor(this.column.id);
  }

  deleteColumn() {
    this.onDel.emit(this.column.id);
    this.colorService.deleteColumn(this.column.id);
  }

  clearColumn() {
    this.postService.clearColumn(this.column.id).subscribe(() => {
      this.column.posts = [];
    });
  }

  createPost() {
    let post: Post = {
      text: this.form.controls['text'].value,
    };

    this.showTextarea = false;

    this.postService
      .createPost(post, this.column.id, this.column.posts.length)
      .subscribe(
        () => {
          this.form.reset();
          this.column.posts.unshift(post);
        },
        (error) => {
          console.log('[CREATE POST]:', error);
        }
      );
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId, this.column.id).subscribe(() => {
      this.column.posts.splice(postId, 1);
    });
  }

  addLike([postId, likes, likedBy]: [number, number, string]) {
    this.postService
      .addLike(postId, this.column.id, likes, likedBy)
      .subscribe(() => {});
  }

  drop(event: CdkDragDrop<Post[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.onDrop.emit();
  }
}
