export class Paginacao {

    public pagina: number = 0;
    public filtro: string = '';
    public totalElementos: number;
    public tamanho: number = 5;
    public eAultima: boolean = false;
    
    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}