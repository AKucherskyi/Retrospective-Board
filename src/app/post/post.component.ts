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
  liked!: boolean;
  showComments: boolean = false;
  form!: FormGroup;
  userEmail!: string;

  @Input() color!: string;
  @Input() columnId!: string;
  @Input() post!: Post;
  @Input() id!: number;
  @Output() onLike: EventEmitter<[number, number, string]> = new EventEmitter();
  @Output() onDel: EventEmitter<number> = new EventEmitter();

  constructor(
    private auth: AuthService,
    private snackBarService: SnackBarService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required]),
    });

    this.post.comments = this.post?.comments || [];

    this.userEmail = localStorage.getItem('email') as string;

    this.post.likedBy = this.post.likedBy || '';

    this.liked = this.post.likedBy.includes(this.userEmail);
  }

  deletePost() {
    this.onDel.emit(this.id);
  }

  submitComment() {
    const comment: Comment = {
      author: localStorage.getItem('username') as string,
      text: this.form.value.text,
      date: new Date(),
    };

    let length = this.post.comments ? this.post.comments.length : 0;

    this.postService
      .addComment(this.id, this.columnId, length, comment)
      .subscribe(() => {
        this.form.reset();
        this.post.comments?.push(comment);
      });
  }

  deleteComment(idx: number) {
    this.postService
    .deleteComment(this.id, this.columnId, idx)
    .subscribe(() => {
      this.post.comments?.splice(idx, 1);
    });
  }

  addLike() {
    if (
      this.post.likes !== undefined &&
      this.auth.isAuthenticated() &&
      this.post.likedBy !== undefined
    ) {

      if (this.liked) {
        this.post.likes--;
        this.liked = !this.liked;
        this.post.likedBy = this.post.likedBy
          .replace(this.userEmail, '')
          .trim();
      } else {
        this.post.likes++;
        this.liked = !this.liked;
        this.post.likedBy += ' ' + this.userEmail;
      }

      this.onLike.emit([this.id, this.post.likes, this.post.likedBy]);
    } else {
      this.snackBarService.openSnackBar('AUTH');
    }
  }
}
