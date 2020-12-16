import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Funcionario } from "../models/funcionario.entity";

@Injectable()
export class FuncionarioService {

    private urlBase: string = 'http://localhost:8080/funcionario';

    public constructor(private http: HttpClient) {}

    public findAll(lojaId: number, palavra: string, pagina: number) {
        const _params = new HttpParams().set('palavra', `${palavra}`).set('pagina', `${pagina}`);
        return this.http.get<any>(this.urlBase.concat(`/${lojaId}`), {
            observe: 'response', params: _params
        });
    }

    public create(lojaId: number, funcionario: Funcionario) {
        return this.http.post<Funcionario>(this.urlBase.concat(`/${lojaId}`), funcionario); 
    }

    public update(lojaId: number, funcionario: Funcionario) {
        return this.http.put<Funcionario>(this.urlBase.concat(`/${lojaId}`), funcionario); 
    }

    public delete(lojaId: number, funcionario: Funcionario) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: funcionario
        }
        return this.http.delete<Funcionario>(this.urlBase.concat(`/${lojaId}`), options);
    }
}