import { Component,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-newcustoms',
  templateUrl: './newcustoms.component.html',
  styleUrls: ['./newcustoms.component.css']
})
export class NewcustomsComponent {
  pendingowners:any[]=[];
  private ownersSubscription: Subscription;
  constructor(private service:AuthService){
    this.ownersSubscription = this.service.viewPendingRegistrations().subscribe((data)=>{
      this.pendingowners=data
    })
  }
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.ownersSubscription) {
      this.ownersSubscription.unsubscribe();
    }
  }
  refuse(id:any,i:any){
    this.service.refuseRegistration(id).subscribe((data)=>{
      console.log(data)
      this.pendingowners.splice(i,1)
    })
   
  }
}
