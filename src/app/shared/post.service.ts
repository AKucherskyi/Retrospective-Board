import { Column } from './interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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

  columns: Column[] = [this.done, this.notdone, this.todo]

  constructor() { }

  createColumn(name: string) {
    this.columns.push({name, elements: [], id: this.columns.length.toString()})
    console.log('create', this.columns);
  }

  getColumns(): Observable<Column[]> {
    return of(this.columns).pipe(delay(1000))
  }

  deleteColumn(id: string) {
    this.columns.push({name: id, elements: [], id: this.columns.length.toString()})
    console.log('delete', this.columns);
  }
}
