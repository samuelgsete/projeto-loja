import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routing.module';

@NgModule({
  declarations: [
    FooterComponent, 
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports:[
    FooterComponent,
    MenuComponent
  ]
})
export class LayoutModule { }