import { environment } from './../../environments/environment';
import { Column, ColumnsObj } from './interfaces';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor (private http: HttpClient) {}

  todo = {
    elements: [{text:'Get to work'},{text:'Get to work'},{text:'Get to work'},],
    name: 'Todo',
    id: '0'
  };

  done = {
    elements: [
      {text:'Get to work'},{text:'Get to work'},{text:'Get to work'},
    ],
    name: 'Done',
    id: '1'
  };

  notdone = {
    elements: [
      {text:'Get to work'},{text:'Get to work'},{text:'Get to work'},
    ],
    name: 'Not Done',
    id: '2'
  };

  columns: Column[] = []

  invokeColumnCreation: Subject<any> = new Subject()

  createColumn(name: string) {
    const column = {name, elements: [
      {text:'Get to work'},{text:'Get to work'},{text:'Get to work'},
    ]}
    return this.http.post<Column>(`${environment.fbDbUrl}/columns.json`, column)
    .pipe(
      map((response) => ({
        id: response.name,
        ...column
      }))
    )
  }

  getColumns(): Observable<Column[]> {
    return this.http.get(`${environment.fbDbUrl}/columns.json`)
    .pipe(
      map((response: {[key: string]: any}) => {
        return Object
        .keys(response)
        .map((key) => ({
          ...response[key],
          id: key,
          elements: ('elements' in response[key]) ? response[key].elements : []
        }))
      })
    )
  }

  updateColumns(columns: Column[]) {
    let columnsObj = columns.reduce((acc: ColumnsObj , curr) => {
      acc[curr.id] = {name: curr.name, elements: curr.elements}
      return acc
    }, {})
    console.log(columnsObj)
    return this.http.put<Column[]>(`${environment.fbDbUrl}/columns.json`, columnsObj)
  }

  deleteColumn(id: string): Observable<void> {
    console.log('delete', id);
    return this.http.delete<void>(`${environment.fbDbUrl}/columns/${id}.json`)
  }
}
