package br.com.samuel.lojaapi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.samuel.lojaapi.entity.Loja;
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
    
    public List<Loja> findAll() { 
        return lojaRepository.findAll(); 
    }

    public Integer saveOrUpdate(Loja loja) { 
        return lojaRepository.save(loja).getId(); 
    }

    public void deleteById(Integer id) {
        lojaRepository.deleteById(id);
    }
}