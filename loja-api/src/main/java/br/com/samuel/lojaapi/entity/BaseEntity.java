package br.com.samuel.lojaapi.entity;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.GeneratedValue;

@MappedSuperclass
public abstract class BaseEntity {
    
    @Id
    @GeneratedValue(strategy = IDENTITY)
    protected Integer id;

    public BaseEntity() { }

    public BaseEntity(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}