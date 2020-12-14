import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.interface';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-delete-contact-modal',
  templateUrl: './delete-contact-modal.component.html',
  styles: [
     `
      .mat-button{
        outline: none !important;
      }
     `
  ]
})
export class DeleteContactModalComponent {

  public contactToDelete: any;

  constructor( public dialogRef: MatDialogRef<DeleteContactModalComponent>,
               private service: Service,
               @Inject(MAT_DIALOG_DATA) public data: Contact ) {
                 this.contactToDelete = Object.values( data )[0]
               }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteContact(){

    this.service.openSnackBar( 'Deleting contact...',  null )

    this.service.deleteContact( this.data )
      .subscribe( (res: any) => {
        this.service.closeSnackBar();

        ( res.ok ) ?          
          this.service.handleSnackBar('Contact deleted succesfully', 'Close')
          :
          this.service.handleSnackBar('An error ocurred, the contact could not be deleted', 'Close')

        const contactDeleted = new CustomEvent('contactDeleted', { detail: res })
        dispatchEvent( contactDeleted )
      })
  }

}
