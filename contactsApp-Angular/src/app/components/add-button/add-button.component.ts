import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service } from 'src/app/services/service.service';
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  constructor( public dialog: MatDialog, private service: Service ) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    this.service.openModal( AddContactModalComponent, '' )
  }

}
