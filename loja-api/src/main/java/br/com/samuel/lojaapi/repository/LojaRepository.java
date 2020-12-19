package br.com.samuel.lojaapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.samuel.lojaapi.entity.Loja;

@Repository
public interface LojaRepository extends JpaRepository<Loja, Integer> {
	
	@Query("SELECT l FROM Loja l WHERE LOWER(l.razaoSocial) LIKE %:filtro% ORDER BY l.razaoSocial ASC")
	Page<Loja> findByFilter(@Param("filtro") String filtro, Pageable pageable);
}