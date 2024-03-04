import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceComponent } from './interface/interface.component';
import { CustomersComponent } from './interface/customers/customers.component';
import { StadiumsComponent } from './interface/stadiums/stadiums.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewcustomsComponent } from './interface/newcustoms/newcustoms.component';
import { PacksComponent } from './interface/packs/packs.component';
import { AdminAuthGuard } from './gaurds/admin-auth.guard';
import { NewOwnerComponent } from './interface/new-owner/new-owner.component';
import { PlayersComponent } from './interface/players/players.component';

const routes: Routes = [
  {path:'interface',component:InterfaceComponent,canActivate: [AdminAuthGuard],children:[
    {path:'',component:CustomersComponent},
    {path:'stadiums',component:StadiumsComponent},
    {path:'newcustoms',component:NewcustomsComponent},
    {path:'packs',component:PacksComponent},
    {path:'addowner',component:NewOwnerComponent},
    {path:'players',component:PlayersComponent}
  ]},
  {path:'',component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
