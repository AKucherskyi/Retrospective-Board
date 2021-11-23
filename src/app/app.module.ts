
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ColumnComponent } from './column/column.component';
import { CreateColumnComponent } from './column/create-column/create-column.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { AuthInterceptor } from './shared/auth.interceptor';


const INTERCEPROR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    BoardPageComponent,
    ToolbarComponent,
    ColumnComponent,
    CreateColumnComponent,
    PostComponent,
    HeaderComponent,
    LoginPageComponent,
    RegisterPageComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MomentModule

  ],
  providers: [INTERCEPROR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
