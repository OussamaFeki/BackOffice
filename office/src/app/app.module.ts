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
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { NewOwnerComponent } from './interface/new-owner/new-owner.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsComponent } from './interface/details/details.component';
import { PlayersComponent } from './interface/players/players.component';
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
    PacksComponent,
    NewOwnerComponent,
    DetailsComponent,
    PlayersComponent
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
    MatDialogModule, 
    MatDividerModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
