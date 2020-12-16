package br.com.samuel.lojaapi.entity;

import java.util.ArrayList;
import java.util.List;

public class Tupla<T> {

    public long count;
    public List<T> data = new ArrayList<T>();   

    public Tupla() {}

    public Tupla(int count, List<T> data) {
        this.count = count;
        this.data = data;
    }
}