import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-owner',
  templateUrl: './new-owner.component.html',
  styleUrls: ['./new-owner.component.css']
})
export class NewOwnerComponent {
  stadeOwnerForm: FormGroup;
  packs: any[]=[];
  getservice:Subscription;
  constructor(private formBuilder: FormBuilder,private service:AuthService) {
    this.getservice=this.service.getAllPacks().subscribe(
      (response) => {
        this.packs = response;
        console.log(response)
      },
      (error) => {
        console.error('Error retrieving packs', error);
        // Handle error as needed
      }
    );
    this.stadeOwnerForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      pack: ['', Validators.required]
    });
  }
  onSubmit(){

  }
}
