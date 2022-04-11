import { ContactService } from './../../services/contact.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  addMessage(name: string, email: string, subject: string, message: string) {
    this.contactService
      .addCustomerMessage(name, email, subject, message)
      .then((data) => {
        console.log(data);
        this.openSnackBar('Info Submitted');
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
