import { Column } from './../shared/interfaces';
import { PostService } from './../shared/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: 'board-page.component.html',
  styleUrls: ['board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  columns!: Column[];
  loading!: boolean;
  width!: string;

  cSub!: Subscription;
  rSub!: Subscription;
  uSub!: Subscription;
  dSub!: Subscription;
  lSub!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.rSub = this.postService.getColumns().subscribe((columns) => {
      this.columns = columns;
    });

    this.cSub = this.postService.invokeColumnCreation$.subscribe((column) => {
      this.createColumn(column);
    });

    this.lSub = this.postService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

  createColumn(column: Column): void {
    this.columns.push(column);
  }

  updateColumns(): void {
    this.uSub = this.postService
      .updateColumns(this.columns)
      .subscribe(() => {});
  }

  deleteColumn(id: string): void {
    this.dSub = this.postService.deleteColumn(id).subscribe(() => {
      this.columns = this.columns.filter((column) => column.id != id);
    });
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
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
