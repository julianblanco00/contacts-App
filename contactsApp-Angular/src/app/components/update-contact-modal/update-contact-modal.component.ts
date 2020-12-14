import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.interface';
import { DialogData } from 'src/app/models/dialogData.interface';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-update-contact-modal',
  templateUrl: './update-contact-modal.component.html',
  styles: [
    `
      img{
        border-radius: 50%;
        width: 60px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      img:hover{
        filter: brightness(0.9);
        cursor: pointer;
      }

      .mat-button{
        outline: none !important;
      }`
  ]
})
export class UpdateContactModalComponent {

  error: boolean = false
  urlImage: string
  contact: Contact

  @ViewChild('inputName') contactName: ElementRef
  @ViewChild('inputPhone') contactPhone: ElementRef
  @ViewChild('inputEmail') contactEmail: ElementRef
  @ViewChild('inputCompany') contactCompany: ElementRef
  @ViewChild('inputAddress') contactAddress: ElementRef
  @ViewChild('inputBirthday') contactBirthday: ElementRef
  @ViewChild('contactImage') contactImage: ElementRef

  constructor( public dialogRef: MatDialogRef<UpdateContactModalComponent>,
               private service: Service, 
               @Inject(MAT_DIALOG_DATA) public data: Contact) {
                this.contact = Object.values( this.data )[0]
                this.contact.id = Object.keys( this.data )[0]
              }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getImageUrl(){
    this.urlImage = this.contactImage.nativeElement.src
  }

  validateData(){

    const name = this.contactName.nativeElement.value
    const phone = this.contactPhone.nativeElement.value
    const email = this.contactEmail.nativeElement.value
    const company = this.contactCompany.nativeElement.value
    const address = this.contactAddress.nativeElement.value
    const birthday = this.contactBirthday.nativeElement.value

    if( name.trim() == '' || phone.trim() == '' ){
      this.error = true

    }else{
      
      const contact = {
        name, 
        phone,
        image: this.urlImage,
        email,
        company,
        address,
        birthday,
        id: this.contact.id
      }

      if( !contact.image ) contact.image = 'http://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png'

      this.service.openSnackBar( 'Updating contact...',  null )

      this.onNoClick()
      this.updateContact( contact )

    }

  }

  updateContact( contact: any ) {
    this.service.updateContact( contact )
      .subscribe( ( res: any ) => {

        this.service.closeSnackBar();

        ( res.ok ) ?          
          this.service.handleSnackBar('Contact updated succesfully', 'Close')
          :
          this.service.handleSnackBar('An error ocurred, the contact could not be updated', 'Close')

        dispatchEvent( new CustomEvent( 'updatedContact', { detail: res } ))
      }) 
  }

}
