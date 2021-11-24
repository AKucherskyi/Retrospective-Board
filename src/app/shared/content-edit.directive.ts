import { Column } from './interfaces';
import { PostService } from './post.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appContentEdit]',
})
export class ContentEditDirective {
  constructor(public el: ElementRef, private postService: PostService) {
    this.el.nativeElement.setAttribute('contenteditable', 'true');
  }

  @Input('column') column: Column | undefined;

  @HostListener('blur') onBlur() {
    this.changeName();
  }

  @HostListener('keydown', ['$event']) onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.el.nativeElement.blur();
      this.changeName();
    }
  }

  private changeName() {
    this.postService
      .changeName(this.el.nativeElement.innerHTML, this.column?.id)
      .subscribe(() => {});
  }
}
