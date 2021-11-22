import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  colors: string[] = ['red', 'green', 'blue', 'purple', 'yellow'];
  columnColors: { [key: string]: string } = {};

  constructor() {}

  getColor(columnId: string) {
    if (!this.columnColors[columnId]) {
      this.columnColors[columnId] = this.colors.shift() as string;
    }
    return this.columnColors[columnId];
  }

  deleteColumn(columnId: string) {
    this.colors.push(this.columnColors[columnId])
    delete this.columnColors[columnId]
  }
}
