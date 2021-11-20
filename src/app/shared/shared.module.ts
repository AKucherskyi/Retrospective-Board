import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import {MatCardModule} from '@angular/material/card';
import { SnackBarAuthComponent } from './snack-bars/snack-bar-auth/snack-bar-auth.component';
import { SnackBarComponent } from './snack-bars/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    SnackBarComponent,
    LoaderComponent,
    SnackBarAuthComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    DragDropModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    DragDropModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    LoaderComponent,
    MatCardModule
  ]
})
export class SharedModule { }
