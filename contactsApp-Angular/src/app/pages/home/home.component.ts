import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.interface';
import { TableData } from 'src/app/models/tableData.interface';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = []
  contactsIds: string[] = []

  contacts: any = {};

  searchNotFound: boolean
  noContactsAdded: boolean;

  constructor( private service: Service ) {
  }

  ngOnInit(): void {

    this.getTableData()

    addEventListener('contactDeleted', ( evt: any ) => {
      const id = evt.detail.id
      const i = this.contactsIds.indexOf( id )

      if( i > -1 ){
        this.contactsIds.splice( i, 1 )
        delete this.contacts[id]
      }

      if( !Object.keys( this.contacts ).length ){
        this.noContactsAdded = true
      }
    })

    addEventListener('addedContact', ( evt: any ) => {
      const resp = evt.detail.newContact

      this.noContactsAdded = false;
      this.contacts[ resp.id ] = resp.data
      this.contactsIds.push( resp.id )
    })

    addEventListener('updatedContact', ( evt: any ) => {
      const resp = evt.detail.newData
      this.contacts[ resp.id ] = resp.data
    })
  }

  getTableData(){
    this.service.getTableData()
      .subscribe( ( res: TableData ) => {
        
        if( !res.contacts ) {
          this.noContactsAdded = true;
        
        }else{
          this.contactsIds = res.contactsIds
          this.contacts = res.contacts
        }

        this.displayedColumns = res.columns
      })
  }

  loadSearchResult( results: TableData ){

    if( !results.contacts ){
      this.searchNotFound = true;
      this.contacts = null
      this.contactsIds = null

    }else{
      this.contacts = results.contacts;
      this.contactsIds = results.contactsIds
    }
    
  }

}
