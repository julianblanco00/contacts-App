import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { urlNode } from '../config/url';
import { Contact } from '../models/contact.interface';
import { TableData } from '../models/tableData.interface';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, private http: HttpClient ) { }

  openSnackBar( message: string, action: string ) {
    this._snackBar.open( message, action );
  }

  closeSnackBar(){
    this._snackBar.dismiss()
  }

  openModal( component:any, value:any ){
    const dialogRef = this.dialog.open(component, {
      width: '650px',
      data: value
    })

    dialogRef.afterClosed().subscribe();
  }

  getTableData(): Observable<TableData>{
    return this.http.get<TableData>( `${ urlNode }/api/getTableData` )
  }

  addContact( contact: Contact ): Observable<Contact>{
    return this.http.post<Contact>( `${ urlNode }/api/addContact`, contact )
  }

  deleteContact( contact: Contact ): Observable<any>{
    const id = Object.keys( contact )[0]
    const obj = { id }
    return this.http.post<any>( `${ urlNode }/api/deleteContact`, obj )
  }

  updateContact( contact: Contact ): Observable<Contact>{
    return this.http.put<Contact>( `${ urlNode }/api/updateContact`, contact )
  }

  searchByAddress( text: any ){
    const params = { query: text };

    return this.http.get<TableData>(`${urlNode}/api/searchContact/address`, {
      params
    })
  }

  searchByName( text: any ){
    const params = { query: text };

    return this.http.get<TableData>(`${urlNode}/api/searchContact/name`, {
      params
    })
  }

  searchByEmailOrPhone( text: any ){
    const params = { query: text };

    return this.http.get<TableData>(`${urlNode}/api/searchContact/emailOrPhone`, {
      params
    })
  }

  handleSnackBar( message: string, action: string ){

    this.openSnackBar( message, action )

    setTimeout(() => {
      this.closeSnackBar()
    }, 5000);

  }

}
