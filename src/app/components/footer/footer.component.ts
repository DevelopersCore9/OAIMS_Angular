import { ContactService } from './../../services/contact.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl,  Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})

export class FooterComponent implements OnInit {
  @ViewChild('name') nameValue : any;
@ViewChild('email') emailValue : any;
@ViewChild('subject') subjectValue : any;
@ViewChild('comment') commentValue : any;

  constructor(
    private contactService: ContactService,
    private _snackBar: MatSnackBar
  ) {}


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  subjectFormControl = new FormControl('', [Validators.required]);
  commentFormControl = new FormControl('', [Validators.required]);
  ngOnInit(): void {}

  addMessage(name: string, email: string, subject: string, message: string) {
    this.contactService
      .addCustomerMessage(name, email, subject, message)
      .then((data) => {
        console.log(data);
        this.openSnackBar('Info Submitted');
        this.nameValue.nativeElement.value = ' ';
        this.emailValue.nativeElement.value = ' ';
        this.subjectValue.nativeElement.value = ' ';
        this.commentValue.nativeElement.value = ' ';

      })
      .catch((err) => {
        console.log(err);
      });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, ' ', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }


}
