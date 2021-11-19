import { environment } from './../../environments/environment';
import { Column, ColumnsObj, Post } from './interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  numberOfColumns!: number;

  invokeColumnCreation$: Subject<any> = new Subject();
  loading$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  createColumn(name: string) {
    this.loading$.next(true);
    const column = { name, posts: [] };
    return this.http
      .post<Column>(`${environment.fbDbUrl}/columns.json`, column)
      .pipe(
        map((response) => ({
          id: response.name,
          ...column,
        })),
        tap(() => {
          this.numberOfColumns++;
          this.loading$.next(false);
        })
      );
  }


  getColumns(): Observable<Column[]> {
    this.loading$.next(true);
    return this.http.get(`${environment.fbDbUrl}/columns.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          posts: 'posts' in response[key] ? response[key].posts : [],
        }));
      }),
      tap((columns: Column[]) => {
        this.numberOfColumns = columns.length;
        this.loading$.next(false);
      })
    );
  }


  updateColumns(columns: Column[]) {
    let columnsObj = columns.reduce((acc: ColumnsObj, curr) => {
      acc[curr.id] = { name: curr.name, posts: curr.posts };
      return acc;
    }, {});

    return this.http.put<Column[]>(
      `${environment.fbDbUrl}/columns.json`,
      columnsObj
    );
  }

  deleteColumn(id: string): Observable<void> {
    this.loading$.next(true);
    return this.http
      .delete<void>(`${environment.fbDbUrl}/columns/${id}.json`)
      .pipe(
        tap(() => {
          this.numberOfColumns--;
          this.loading$.next(false);
        })
      );
  }

  createPost(post: Post, columnId: string, length: number): Observable<Post> {
    return this.http.put<Post>(
      `${environment.fbDbUrl}/columns/${columnId}/posts/${length}.json`,
      post
    );
  }
}
