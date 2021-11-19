import { PostService } from './../shared/post.service';
import { Post } from './../shared/interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  deletePost() {
    
  }

}
