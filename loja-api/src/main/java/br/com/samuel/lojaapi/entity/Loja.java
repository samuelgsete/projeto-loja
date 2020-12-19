package br.com.samuel.lojaapi.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Loja extends BaseEntity {
    
    @Column(nullable = false, unique = false)
    private String cnpj;

    @Column(nullable = false, unique = false, length = 30)
    private String razaoSocial;

    @Column(nullable = false, unique = false, length = 30)
    private String nomeFantasia;

    @Column(nullable = false, unique = false)
    private String telefone;

    @Column(nullable = true, unique = false)
    private Integer qtdFuncionarios = 0;

    @JsonIgnore
    @OneToMany(mappedBy = "loja", cascade= CascadeType.ALL)
    private Set<Funcionario> funcionarios = new HashSet<Funcionario>();

    public Loja() {}

    public String getCnpj() {
        return this.cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return this.razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return this.nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Integer getQtdFuncionarios() {
        return this.qtdFuncionarios;
    }

    public void setQtdFuncionarios(Integer qtdFuncionarios) {
        this.qtdFuncionarios = qtdFuncionarios;
    }

    public Set<Funcionario> getFuncionarios() {
        return this.funcionarios;
    }

    public void setFuncionarios(Set<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }

    public void adicionarFuncionario(Funcionario funcionario) {
        funcionarios.add(funcionario);
        qtdFuncionarios = funcionarios.size();
    }

    public void removerFuncionario(Funcionario funcionario) {
        funcionarios.remove(funcionario);
        qtdFuncionarios = funcionarios.size();
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
        Loja other = (Loja) obj;
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
            " cnpj='" + getCnpj() + "'" +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", nomeFantasia='" + getNomeFantasia() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", qtdFuncionarios='" + getQtdFuncionarios() + "'" +
            "}";
    }
}