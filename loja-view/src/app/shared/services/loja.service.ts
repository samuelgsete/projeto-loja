import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Loja } from "../models/loja.entity";
import { Paginacao } from "../models/paginacao.entity";

@Injectable()
export class LojaService {

    private urlBase: string = 'http://localhost:8080/loja';

    public constructor(private http: HttpClient) {}

    public findAll(paginacao: Paginacao) {
        const _params = new HttpParams().set('filtro', `${paginacao.filtro}`).set('page', `${paginacao.pagina}`).set('size', `${paginacao.tamanho}`);
        return this.http.get<any>(this.urlBase, {
            observe: 'response', params: _params
        });
    }

    public create(loja: Loja) {
        return this.http.post<Loja>(this.urlBase, loja); 
    }

    public update(loja: Loja) {
        return this.http.put<Loja>(this.urlBase, loja); 
    }

    public delete(id: number) {
        return this.http.delete<Loja>(this.urlBase.concat(`/${id}`));
    }
}