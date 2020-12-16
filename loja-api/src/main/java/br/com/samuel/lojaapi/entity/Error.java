package br.com.samuel.lojaapi.entity;

import org.springframework.http.HttpStatus;

public class Error {

    private HttpStatus status;
    private String descricao;
    private String detalhes;

    public Error() {}

    public Error(HttpStatus status, String descricao, String detalhes) {
        this.status = status;
        this.descricao = descricao;
        this.detalhes = detalhes;
    }

    public HttpStatus getStatus() {
        return this.status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
   
    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDetalhes() {
        return this.detalhes;
    }

    public void setDetalhes(String detalhes) {
        this.detalhes = detalhes;
    }

    @Override
    public String toString() {
        return "{" +
            " codigo='" + getStatus() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", detalhes='" + getDetalhes() + "'" +
            "}";
    }
}
