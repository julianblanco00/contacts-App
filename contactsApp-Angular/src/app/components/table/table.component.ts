import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.interface';
import { Service } from 'src/app/services/service.service';
import { DeleteContactModalComponent } from '../delete-contact-modal/delete-contact-modal.component';
import { UpdateContactModalComponent } from '../update-contact-modal/update-contact-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input('displayedColumns') displayedColumns: string[]
  @Input('contacts') contacts: Contact[]
  @Input('contactsIds') contactsIds: string[]
  @Input('noContactsAdded') noContactsAdded: boolean;

  public searchNotFound: boolean

  constructor( private service: Service ) { }

  ngOnChanges( changes: any ){
    if( changes.contacts ){
      ( !changes.contacts.currentValue ) ?
        this.searchNotFound = true
        :
        this.searchNotFound = false
        this.contacts = changes.contacts.currentValue
    }    
  }

  ngOnInit(): void {}

  deleteContact( contact: Contact, id: string ){
    const newObj = {}
    newObj[id] = contact

    this.service.openModal( DeleteContactModalComponent, newObj )
  }

  editContact( contact: Contact, id: string ){
    const newObj = {}
    newObj[id] = contact

    this.service.openModal( UpdateContactModalComponent, newObj )
  }

}
