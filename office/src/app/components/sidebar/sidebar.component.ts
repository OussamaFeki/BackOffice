import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  iskickoff:boolean=true;
  panelOpenState:boolean=false;
  constructor(private authservice:AuthService,private router:Router){}
logout(){
  this.authservice.logout();
  this.router.navigate(['']);
}
change(){
  if (this.iskickoff){
    this.iskickoff=false;
  }else{
  this.iskickoff=true;
  }
}
}
