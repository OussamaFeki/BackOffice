import { Component,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnDestroy {
  players:any[]=[];
  getservice:Subscription;
  p:number=0
  constructor(private service:AuthService){
    this.getservice=this.service.getAllPlayers().subscribe((data)=>{
      this.players=data;
      console.log(data)
    })
  }
  ngOnDestroy(): void {
      this.getservice.unsubscribe()
  }
}
