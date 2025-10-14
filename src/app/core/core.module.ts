import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from "../app-routing.module";
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
],
  exports: [
    NavbarComponent,
    NotificationComponent
  ]
})
export class CoreModule { }
