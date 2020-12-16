package br.com.samuel.lojaapi.entity;

public class FiltroBusca {
    
    public String palavra;
    public int pagina;
    public int tamanho = 6;

    public FiltroBusca() {}

    public FiltroBusca(String palavra, int pagina, int tamanho) {
        this.palavra = palavra;
        this.pagina = pagina;
        this.tamanho = tamanho;
    }    
}