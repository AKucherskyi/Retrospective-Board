import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { PostService } from './../shared/post.service';
import { AuthService } from './../auth/auth.service';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PostComponent } from './post.component';
import { SnackBarService } from '../shared/snack-bars/snack-bar.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PostComponent', () => {
  let component!: PostComponent;
  let fixture!: ComponentFixture<PostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated() {
              return true;
            },
          },
        },
        SnackBarService,
        PostService,
      ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = {
      text: 'test',
      likes: 2,
      comments: [],
      likedBy: '',
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('#like_btn should toggle like', () => {
    let btn = fixture.debugElement.query(By.css('.like_btn'));
    btn.triggerEventHandler('click', null);
    expect(component.post.likes).toEqual(3);
    btn.triggerEventHandler('click', null);
    expect(component.post.likes).toEqual(2);
  });

  it('should set title to mat-card-title', () => {
    let de = fixture.debugElement.query(By.css('mat-card-title'));
    let el: HTMLElement = de.nativeElement;
    expect(el.textContent).toContain(component.post.text);
  });

  it('#toggle_comments button should show comments', () => {
    let btn = fixture.debugElement.query(By.css('.toggle_comments'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.comments'));

    expect(de).toBeTruthy();
  });

  it('#delete_btn should call #onDel.emit()', fakeAsync(() => {
    let menu = fixture.debugElement.query(By.css('.more'));
    let spy = spyOn(component.onDel, 'emit');

    menu.triggerEventHandler('click', null);
    tick(1000);

    let btn = fixture.debugElement.query(By.css('.delete_btn'));
    btn.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
  }));

  describe('Submit of comments form', () => {
    beforeEach(() => {
      let btn = fixture.debugElement.query(By.css('.toggle_comments'));
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should call postService.addComment()', () => {
      let service = TestBed.inject(PostService);
      let spy = spyOn(service, 'addComment');
      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);
      expect(spy).toHaveBeenCalled();
    });

  });
});
