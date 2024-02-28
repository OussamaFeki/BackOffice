import { Component,OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnDestroy{
  form:FormGroup;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  packs: any[]=[];
  getservice:Subscription;
  p: number = 1;
  constructor(private service:AuthService,private fb:FormBuilder){
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
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      cap_stades: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      features: this.fb.array([]),
    });
  }
  // Getter for easy access to the 'features' form array
  get featuresFormArray() {
    return this.form.get('features') as FormArray;
  }
  // Add a new feature to the 'features' form array
  addFeature() {
    this.featuresFormArray.push(this.fb.control(''));
  }

  // Remove a feature from the 'features' form array based on index
  removeFeature(index: number) {
    this.featuresFormArray.removeAt(index);
  }


  add(){
    if (this.form.valid) {
      this.service.createPack(this.form.value).subscribe(
        (response) => {
          console.log('Pack created successfully', response);
          // Optionally, reset the form after successful creation
          this.packs.push(response.pack)
          this.form.reset();
        },
        (error) => {
          console.error('Error creating pack', error);
          // Handle error as needed
        }
      );
    } else {
      // Handle the case when the form is not valid
      console.error('Form is not valid');
    }
  }
  delete(id:any,i:any){
      this.service.deletePack(id).subscribe((data)=>{
        console.log(data)
        this.packs.splice(i+((this.p-1)*3),1);
      })
    console.log(i+((this.p-1)*3))
    console.log(this.p);
  }
  ngOnDestroy(): void {
      this.getservice.unsubscribe()
  }
}
