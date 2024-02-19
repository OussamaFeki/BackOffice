import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InterfaceComponent } from './interface/interface.component';
import { MainComponent } from './components/main/main.component';
import { CustomersComponent } from './interface/customers/customers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { StadiumsComponent } from './interface/stadiums/stadiums.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewcustomsComponent } from './interface/newcustoms/newcustoms.component';
import { PacksComponent } from './interface/packs/packs.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    InterfaceComponent,
    MainComponent,
    CustomersComponent,
    StadiumsComponent,
    LoginComponent,
    SignupComponent,
    NewcustomsComponent,
    PacksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule, 
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
