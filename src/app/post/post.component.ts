import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SnackBarService } from './../shared/snack-bars/snack-bar.service';
import { AuthService } from './../auth/auth.service';
import { PostService } from './../shared/post.service';
import { Post, Comment } from './../shared/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  liked: boolean = false;
  showComments: boolean = false;
  form!: FormGroup;
  
  @Input() color!: string;
  @Input() columnId!: string;
  @Input() post!: Post;
  @Input() id!: number;
  @Output() onLike: EventEmitter<[number, number]> = new EventEmitter();
  @Output() onDel: EventEmitter<number> = new EventEmitter();

  // get color(): string {
  //   return this.postService.getColumnColor(this.columnId)
  // } 

  constructor(
    private auth: AuthService,
    private snackBarService: SnackBarService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required]),
    });

    this.post.comments = this.post.comments || []

  }

  deletePost() {
    this.onDel.emit(this.id);
  }

  submitComment() {
    const comment: Comment = {
      author: localStorage.getItem('username') as string,
      text: this.form.value.text
    };

    let length = this.post.comments ? this.post.comments.length : 0

    this.postService
      .addComment(this.id, this.columnId, length, comment)
      .subscribe((response) => {
        this.form.reset()
        this.post.comments?.push(comment)
      });
  }

  addLike() {
    if (this.post.likes !== undefined && this.auth.isAuthenticated()) {
      if (this.liked) {
        this.post.likes--;
        this.liked = !this.liked;
      } else {
        this.post.likes++;
        this.liked = !this.liked;
      }
      this.onLike.emit([this.id, this.post.likes]);
    } else {
      this.snackBarService.openSnackBar('AUTH');
    }
  }
}
