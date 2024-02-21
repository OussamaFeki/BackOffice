import { Component,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stadiums',
  templateUrl: './stadiums.component.html',
  styleUrls: ['./stadiums.component.css']
})
export class StadiumsComponent implements OnDestroy {
  stadiums:any=undefined;
  getservice:Subscription;
constructor(private service:AuthService){
  this.getservice=this.service.viewAllStades().subscribe((data)=>{
    this.stadiums=data
  })
  }
  ngOnDestroy(): void {
      if(this.getservice){
        this.getservice.unsubscribe()
      }
      
  }
}
