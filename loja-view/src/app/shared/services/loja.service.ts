import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Loja } from "../models/loja.entity";

@Injectable()
export class LojaService {

    private urlBase: string = 'http://localhost:8080/loja';

    public constructor(private http: HttpClient) {}

    public findAll(): Observable<Loja[]> {
        return this.http.get<Loja[]>(this.urlBase);
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