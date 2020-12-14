import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TableComponent } from './table/table.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { AddContactModalComponent } from './add-contact-modal/add-contact-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteContactModalComponent } from './delete-contact-modal/delete-contact-modal.component';
import { UpdateContactModalComponent } from './update-contact-modal/update-contact-modal.component';
import { SearchContactComponent } from './search-contact/search-contact.component';


@NgModule({

  declarations: [
    TableComponent,
    AddButtonComponent,
    AddContactModalComponent,
    DeleteContactModalComponent,
    UpdateContactModalComponent,
    SearchContactComponent,
  ],
  
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  exports: [
    TableComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AddButtonComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    SearchContactComponent,
  ]
  
})
export class ComponentsModule { }
