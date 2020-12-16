package br.com.samuel.lojaapi.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class Funcionario extends BaseEntity {

    @Column(nullable = false, unique = false) 
    private String nome;

    @Column(nullable = false, unique = false) 
    private String cpf;

    @OneToMany(fetch= FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "funcionario_id")
    private Set<Telefone> telefones = new HashSet<Telefone>();

    @Column(nullable = false, unique = false) 
    private String email; 

    @Column
    private Boolean status = true;

    public Funcionario() {}

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Set<Telefone> getTelefones() {
        return this.telefones;
    }

    public void setTelefones(Set<Telefone> telefones) {
        this.telefones = telefones;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    /*@Override
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
        Funcionario other = (Funcionario) obj;
        if(id != other.id) {
            return false;
        }
       return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + Integer.parseInt(cpf);
        return result;
    }*/
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
        Funcionario other = (Funcionario) obj;
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
            " nome='" + getNome() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", telefones='" + getTelefones() + "'" +
            ", email='" + getEmail() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}