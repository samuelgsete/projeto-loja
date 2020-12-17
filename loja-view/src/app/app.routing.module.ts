import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LojaComponent } from './loja/loja.component';
import { FuncionarioComponent } from './loja/funcionario/funcionario.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: LojaComponent },
            { path: 'loja', component: LojaComponent },
            { path: 'loja/:id', component: FuncionarioComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}