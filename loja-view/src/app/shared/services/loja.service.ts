import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Loja } from "../models/loja.entity";
import { Funcionario } from "../models/funcionario.entity";
import { Paginacao } from "../models/paginacao.entity";

@Injectable()
export class LojaService {

    private urlBase: string = 'http://localhost:8080/loja';

    public constructor(private http: HttpClient) {}

    public buscarTodasAsLojas(paginacao: Paginacao) {
        const _params = new HttpParams().set('filtro', `${paginacao.filtro}`).set('page', `${paginacao.pagina}`).set('size', `${paginacao.tamanho}`);
        return this.http.get<any>(this.urlBase, {
            observe: 'response', params: _params
        });
    }

    public criarLoja(loja: Loja) {
        return this.http.post<Loja>(this.urlBase, loja); 
    }

    public editarLoja(loja: Loja) {
        return this.http.put<Loja>(this.urlBase, loja); 
    }

    public excluirLoja(id: number) {
        return this.http.delete<Loja>(this.urlBase.concat(`/${id}`));
    }

    public buscarFuncionarios(id: number, paginacao: Paginacao) {
        const _params = new HttpParams().set('filtro', `${paginacao.filtro}`).set('page', `${paginacao.pagina}`).set('size', `${paginacao.tamanho}`);
        return this.http.get<any>(this.urlBase.concat(`/${id}/funcionarios`), {
            observe: 'response', params: _params
        });
    }

    public adicionarFuncionario(id: number, funcionario: Funcionario) {
        return this.http.post<Funcionario>(this.urlBase.concat(`/${id}/funcionarios`), funcionario); 
    }

    public editarFuncionario(id: number, funcionario: Funcionario) {
        return this.http.put<Funcionario>(this.urlBase.concat(`/${id}/funcionarios`), funcionario); 
    }

    public excluirFuncionario(id: number, funcionario: Funcionario) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: funcionario
        }
        return this.http.delete<Funcionario>(this.urlBase.concat(`/${id}/funcionarios`), options);
    }
}