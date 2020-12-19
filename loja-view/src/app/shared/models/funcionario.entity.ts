import { Loja } from "./loja.entity";
import { Telefone } from "./telefone.entity";

export class Funcionario {

    public id: number;
    public nome: string;
    public cpf: string;
    public telefones: Telefone[] = [];
    public email: string;
    public status: boolean;
    public loja: Loja;
    
    public constructor(values: Object = {}) { Object.assign(this, values) }
}