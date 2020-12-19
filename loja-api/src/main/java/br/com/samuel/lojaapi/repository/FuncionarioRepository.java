package br.com.samuel.lojaapi.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.samuel.lojaapi.entity.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
	
	@Query("SELECT f FROM Funcionario f WHERE f.loja.id = :lojaId AND LOWER(f.nome) LIKE %:filtro% ORDER BY f.nome ASC")
	Page<Funcionario> findByIdLoja(@Param("lojaId") Integer lojaId, @Param("filtro") String filtro, Pageable pageable);
}