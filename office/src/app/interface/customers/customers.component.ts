import { Component,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnDestroy {
  owners:any;
  private ownersSubscription: Subscription;

  constructor(private service:AuthService){
    this.ownersSubscription = this.service.getApprovedStadeOwners().subscribe((data)=>{
      this.owners=data
    })
  }
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.ownersSubscription) {
      this.ownersSubscription.unsubscribe();
    }
  }
}
