import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LojaComponent } from './loja.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { SharedModule } from '../shared/shared.module';
import { LojaService } from '../shared/services/loja.service';
import { LayoutModule } from '../layout/layout.module';
import { FuncionarioService } from '../shared/services/funcionario.service';

@NgModule({
  declarations: [
    LojaComponent, 
    FuncionarioComponent]
  ,
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
  ],
  exports: [LojaComponent],
  providers: [
    LojaService,
    FuncionarioService
  ]
})
export class LojaModule { }