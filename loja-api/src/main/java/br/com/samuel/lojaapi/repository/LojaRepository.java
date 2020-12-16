package br.com.samuel.lojaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.samuel.lojaapi.entity.Loja;

@Repository
public interface LojaRepository extends JpaRepository<Loja, Integer> {}