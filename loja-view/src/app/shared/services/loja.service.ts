import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Loja } from "../models/loja.entity";

@Injectable()
export class LojaService {

    private urlBase: string = 'http://localhost:8080/loja';

    public constructor(private http: HttpClient) {}

    public findAll(palavra: string, pagina: number) {
        const _params = new HttpParams().set('palavra', `${palavra}`).set('pagina', `${pagina}`);
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