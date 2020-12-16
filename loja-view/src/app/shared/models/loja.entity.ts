import { Funcionario } from "./funcionario.entity";

export class Loja {

    public id: number;
    public cnpj: string;
    public nomeFantasia: string;
    public razaoSocial: string;
    public telefone: string;
    public funcionarios: Funcionario[] = [];
    public qtdFuncionarios: number;
    
    public constructor(values: Object = {}) { Object.assign(this, values) }
}