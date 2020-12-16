package br.com.samuel.lojaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.samuel.lojaapi.entity.FiltroBusca;
import br.com.samuel.lojaapi.entity.Loja;
import br.com.samuel.lojaapi.entity.Tupla;
import br.com.samuel.lojaapi.services.LojaService;

@RestController
@RequestMapping("/loja")
public class LojaController {
    
    @Autowired
    private LojaService lojaService;

    @GetMapping("/{id}")
    public Loja findById(@PathVariable("id") Integer id) { 
        return lojaService.findById(id); 
    }

    @GetMapping
    public Tupla<Loja> findAll(@RequestParam("palavra") String palavra, @RequestParam("pagina") int pagina) { 
        FiltroBusca filtro = new FiltroBusca(palavra, pagina, 3);
        return lojaService.findAll(filtro); 
    }

    @PostMapping
    public Integer save(@RequestBody() Loja loja) { 
        return lojaService.saveOrUpdate(loja); 
    }

    @PutMapping
    public Integer update(@RequestBody() Loja loja) { 
        return lojaService.saveOrUpdate(loja); 
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) { 
        lojaService.deleteById(id); 
    }
}