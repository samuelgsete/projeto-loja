package br.com.samuel.lojaapi.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import br.com.samuel.lojaapi.entity.enuns.Operadora;

@Entity
public class Telefone extends BaseEntity {

    @Column(nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private Operadora operadora;
    
    @Column(nullable = false, unique = false)
    private String numero;

    public Telefone() {}

    public Operadora getOperadora() {
        return this.operadora;
    }

    public void setOperadora(Operadora operadora) {
        this.operadora = operadora;
    }

    public String getNumero() {
        return this.numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) { 
            return true; 
        }
        if(obj == null) { 
            return false; 
        }
        if(getClass() != obj.getClass()) {
            return false;
        }
        Telefone other = (Telefone) obj;
        if(id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id);
        return result;
    }

    @Override
    public String toString() {
        return "{" +
            " operadora='" + getOperadora() + "'" +
            ", numero='" + getNumero() + "'" +
            "}";
    }
}