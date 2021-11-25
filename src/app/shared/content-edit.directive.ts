import { SnackBarService } from './snack-bars/snack-bar.service';
import { AuthService } from './../auth/auth.service';
import { Column } from './interfaces';
import { PostService } from './post.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appContentEdit]',
})
export class ContentEditDirective {
  constructor(
    public el: ElementRef,
    private postService: PostService,
    private auth: AuthService,
    private snackbarService: SnackBarService
  ) {
    if (this.auth.isAuthenticated()) {
      this.el.nativeElement.setAttribute('contenteditable', 'true');
    }
  }

  @Input('column') column: Column | undefined;

  @HostListener('blur') onBlur() {
    this.changeName();
  }

  @HostListener('click') onClick() {
    if (!this.auth.isAuthenticated()) {
      this.snackbarService.openSnackBar('AUTH');
    }
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
