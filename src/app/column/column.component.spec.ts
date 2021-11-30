import { Post } from './../shared/interfaces';
import { By } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { ColorService } from './../shared/color.service';
import { PostService } from './../shared/post.service';
import { ColumnComponent } from './column.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';

class ColorServiceStub {
  getColor() {
    return 'red';
  }

  deleteColumn(): void {}
}

class PostServiceStub {
  clearColumn(id: string): Observable<void> {
    return of(void 0);
  }

  deletePost(id: number): Observable<void> {
    return of(void 0);
  }

  createPost(): Observable<Post> {
    return of({} as Post);
  }
}

describe('Column Component', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnComponent],
      providers: [
        { provide: PostService, useClass: PostServiceStub },
        { provide: ColorService, useClass: ColorServiceStub },
      ],
      imports: [HttpClientModule, MatMenuModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    component.column = {
      name: 'column',
      posts: [
        {
          text: 'test',
          likes: 2,
          comments: [],
          likedBy: '',
        },
      ],
      id: 'id',
    };
    fixture.detectChanges();
  });

  it('should initialize form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should initialize color', () => {
    expect(component.color).toBe('red');
  });

  describe('Delete column button', () => {
    beforeEach(() => {
      let btn = fixture.debugElement.query(
        By.css('button[aria-label="options"]')
      );
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should call onDel.emit()', () => {
      let btn = fixture.debugElement.query(By.css('.delete_btn'));
      let spy = spyOn(component.onDel, 'emit');
      btn.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalled();
    });

    it('should call colorService.deleteColumn()', () => {
      let service = TestBed.inject(ColorService);
      let spy = spyOn(service, 'deleteColumn');
      let btn = fixture.debugElement.query(By.css('.delete_btn'));
      btn.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalledOnceWith(component.column.id);
    });
  });

  describe('Clear column button', () => {
    beforeEach(() => {
      let btn = fixture.debugElement.query(
        By.css('button[aria-label="options"]')
      );
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should call postService.clearColumn()', () => {
      let service = TestBed.inject(PostService);
      let spy = spyOn(service, 'clearColumn').and.returnValue(of());
      let btn = fixture.debugElement.query(By.css('.clear_btn'));
      btn.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalledWith(component.column.id);
    });

    it('should delete all posts', () => {
      let btn = fixture.debugElement.query(By.css('.clear_btn'));
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.column.posts).toEqual([]);
    });
  });

  describe('Submit of textarea', () => {
    let form: DebugElement;
    beforeEach(() => {
      let btn = fixture.debugElement.query(By.css('.button_add'));
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();
      form = fixture.debugElement.query(By.css('form'));
    });

    it('should call postService.createPost()', () => {
      let service = TestBed.inject(PostService);
      let spy = spyOn(service, 'createPost').and.returnValue(of({} as Post));
      form.triggerEventHandler('ngSubmit', null);
      expect(spy).toHaveBeenCalled();
    });

    it('should reset form', () => {
      let spy = spyOn(component.form, 'reset')
      form.triggerEventHandler('ngSubmit', null);
      expect(spy).toHaveBeenCalled();
    })

    it('should add ne post to view', () => {
      let spy = spyOn(component.column.posts, 'unshift')
      form.triggerEventHandler('ngSubmit', null);
      expect(spy).toHaveBeenCalled();
    })
  });

  it('detetePost() should delete post from view', () => {
    component.deletePost(0)
    expect(component.column.posts).toEqual([])
  })
});
