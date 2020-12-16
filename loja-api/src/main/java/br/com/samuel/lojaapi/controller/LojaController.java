package br.com.samuel.lojaapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.samuel.lojaapi.entity.Loja;
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
    public List<Loja> findAll() { 
        return lojaService.findAll(); 
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