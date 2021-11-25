import { ColorService } from './../shared/color.service';
import { Animations } from './../shared/animations';
import { PostService } from './../shared/post.service';
import { Column, Post } from './../shared/interfaces';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  animations: [Animations.enterAnimation],
})
export class ColumnComponent implements OnInit, OnDestroy {
  showTextarea: boolean = false;
  newPostText: string = '';
  form!: FormGroup;
  color!: string;

  @Input() column!: Column;

  @Output() onDel: EventEmitter<string> = new EventEmitter();
  @Output() onDrop: EventEmitter<string> = new EventEmitter();

  cSub!: Subscription;
  uSub!: Subscription;
  dSub!: Subscription;
  lSub!: Subscription;

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

  deleteColumn(): void {
    this.onDel.emit(this.column.id);
    this.colorService.deleteColumn(this.column.id);
  }

  clearColumn(): void {
    this.uSub = this.postService.clearColumn(this.column.id).subscribe(() => {
      this.column.posts = [];
    });
  }

  createPost(): void {
    let post: Post = {
      text: this.form.controls['text'].value,
    };

    this.showTextarea = false;

    this.cSub = this.postService
      .createPost(post, this.column.id, this.column.posts.length)
      .subscribe(() => {
        this.form.reset();
        this.column.posts.unshift(post);
      });
  }

  deletePost(postId: number): void {
    this.dSub = this.postService.deletePost(postId, this.column.id).subscribe(() => {
      this.column.posts.splice(postId, 1);
    });
  }

  addLike([postId, likes, likedBy]: [number, number, string]): void {
    this.lSub = this.postService
      .addLike(postId, this.column.id, likes, likedBy)
      .subscribe(() => {});
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('fb-token');
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

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }
}
