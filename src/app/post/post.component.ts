import { AuthService } from './../auth/auth.service';
import { PostService } from './../shared/post.service';
import { Post } from './../shared/interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  liked: boolean = false;

  @Input() post!: Post;
  @Input() id!: number;
  @Output() onLike: EventEmitter<[number, number]> = new EventEmitter();

  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit(): void {}

  deletePost() {}

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
    }
  }
}
