import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.interface';
import { Service } from 'src/app/services/service.service';


@Component({
  selector: 'app-add-contact-modal',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.css']
})
export class AddContactModalComponent {

  error: boolean = false
  urlImage: string
  
  @ViewChild('inputName') contactName: ElementRef
  @ViewChild('inputPersonalPhone') contactPhone: ElementRef
  @ViewChild('inputWorkPhone') workPhone: ElementRef
  @ViewChild('inputEmail') contactEmail: ElementRef
  @ViewChild('inputCompany') contactCompany: ElementRef
  @ViewChild('inputAddress') contactAddress: ElementRef
  @ViewChild('inputBirthday') contactBirthday: ElementRef
  @ViewChild('contactImage') contactImage: ElementRef

  constructor( public dialogRef: MatDialogRef<AddContactModalComponent>,
               private service: Service ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getImageUrl(){
    this.urlImage = this.contactImage.nativeElement.src
  }

  validateData(){
    const name = this.contactName.nativeElement.value
    const personalPhone = this.contactPhone.nativeElement.value
    const workPhone = this.workPhone.nativeElement.value
    const email = this.contactEmail.nativeElement.value
    const company = this.contactCompany.nativeElement.value
    const address = this.contactAddress.nativeElement.value
    const birthday = this.contactBirthday.nativeElement.value

    if( !this.urlImage ) this.urlImage = 'http://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png'

    if( name.trim() == '' || personalPhone.trim() == '' ){
      this.error = true

    }else{

      const contact = {
        name, 
        personalPhone,
        workPhone,
        image: this.urlImage,
        email,
        company,
        address,
        birthday,
      }
      console.log(contact);
      this.service.openSnackBar( 'Saving contact...',  null )

      this.onNoClick()
      this.addContact( contact )

    }

  }

  addContact( contact: any ){
    this.service.addContact( contact )
      .subscribe( (res: any) => {

        this.service.closeSnackBar();

        ( res.ok ) ?          
          this.service.handleSnackBar('Contact created succesfully', 'Close')
          :
          this.service.handleSnackBar('An error ocurred, the contact could not be created', 'Close')

        dispatchEvent( new CustomEvent( 'addedContact', { detail: res } ))
      })
  }

}
