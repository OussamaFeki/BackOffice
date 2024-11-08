import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  numberofowner:any
  constructor(private service:AuthService){
    this.service.getNumberStadeOwners().subscribe((data)=>{
      this.numberofowner=data;
      console.log(this.numberofowner);
    })
  }
  ngOnInit(): void {
    let list = document.querySelectorAll(".navigation li");

    const activeLink = (event: MouseEvent) => {
      list.forEach((item: any) => {
        item.classList.remove("hovered");
      });

      (event.target as HTMLElement).classList.add("hovered");
    };

    list.forEach((item: any) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    toggle?.addEventListener('click', () => {
      navigation?.classList.toggle("active");
      main?.classList.toggle("active");
    });
  }
}