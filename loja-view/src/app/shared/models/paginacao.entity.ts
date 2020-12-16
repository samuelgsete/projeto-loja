export class Paginacao {

    public pagina: number = 1;
    public palavra: string = '';
    public total: number;
    public tamanho: number = 5;
    
    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}