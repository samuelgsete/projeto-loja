import { Operadora } from "./operadora.enum";

export class Telefone {
    
    public operadora: Operadora;
    public numero: number;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}