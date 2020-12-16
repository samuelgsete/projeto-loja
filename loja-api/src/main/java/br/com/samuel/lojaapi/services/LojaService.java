package br.com.samuel.lojaapi.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.samuel.lojaapi.entity.FiltroBusca;
import br.com.samuel.lojaapi.entity.Loja;
import br.com.samuel.lojaapi.entity.Tupla;
import br.com.samuel.lojaapi.repository.LojaRepository;

@Service
public class LojaService {
    
    @Autowired
    private LojaRepository lojaRepository;

    public Loja findById(Integer id) { 
        Optional<Loja> loja = lojaRepository.findById(id);
        if(loja.isPresent()) {
            return loja.get();
        }
        return null;
    }
    
    public Tupla<Loja> findAll(FiltroBusca filtro) { 
        List<Loja> lojas = lojaRepository.findAll();
        lojas = lojas
            .stream()
            .filter( loja -> loja.getRazaoSocial().toLowerCase().contains(filtro.palavra))
            .collect(Collectors.toList());

        int total = lojas.size();
        int fromIndex = (filtro.pagina - 1) * filtro.tamanho;
        int toIndex = (filtro.pagina * filtro.tamanho) < lojas.size() ? filtro.pagina * filtro.tamanho : lojas.size();
        lojas = lojas.subList(fromIndex, toIndex);
        return new Tupla<Loja>(total, lojas); 
    }

    public Integer saveOrUpdate(Loja loja) { 
        return lojaRepository.save(loja).getId(); 
    }

    public void deleteById(Integer id) {
        lojaRepository.deleteById(id);
    }
}