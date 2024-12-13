import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-owner',
  templateUrl: './new-owner.component.html',
  styleUrls: ['./new-owner.component.css']
})
export class NewOwnerComponent {
  stadeOwnerForm: FormGroup;
  packs: any[]=[];
  getservice:Subscription;
  p: number = 1;
  constructor(private formBuilder: FormBuilder,private service:AuthService,private snackBar: MatSnackBar) {
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
  select(pack:any){
    if (pack.selected) {
      pack.selected = false;
    } else {
      this.packs.forEach((p: any) => {
        p.selected = false;
      });
      pack.selected = true;
    }
    this.stadeOwnerForm.patchValue({
      pack:pack._id
    });
    console.log(this.stadeOwnerForm.value)
  }
  
  onSubmit(){
    if(this.stadeOwnerForm.valid){
      this.service.creteOwner(this.stadeOwnerForm.value).subscribe((data)=>{
        console.log(data);
        this.snackBar.open('Owner created successfully!', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.stadeOwnerForm.reset()
      },(err)=>{
        this.snackBar.open(err.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      })
    }else{
      this.snackBar.open('complete the form','Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
    
  }
}
