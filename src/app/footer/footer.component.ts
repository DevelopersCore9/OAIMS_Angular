import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  addMessage(name:string,email:string,subject:string,message:string){
    this.contactService.addCustomerMessage(name,email,subject,message)
    .then((data) =>{
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
