package br.com.samuel.lojaapi.controller;

import java.util.List;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.samuel.lojaapi.entity.Funcionario;
import br.com.samuel.lojaapi.services.FuncionarioService;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {
    
    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping("/{lojaId}")
    public List<Funcionario> findAll(@PathVariable("lojaId") Integer lojaId) { 
        return funcionarioService.findByIdLoja(lojaId); 
    }

    @PostMapping("/{lojaId}")
    public void save(@PathVariable("lojaId") Integer lojaId, @RequestBody() Funcionario funcionario) { 
        System.out.println(funcionario);
        funcionarioService.save(lojaId, funcionario); 
    }

    @PutMapping("/{lojaId}")
    public void update(@PathVariable("lojaId") Integer lojaId, @RequestBody() Funcionario funcionario) { 
        funcionarioService.update(lojaId, funcionario); 
    }

    @DeleteMapping("/{lojaId}")
    public void delete(@PathVariable("lojaId") Integer lojaId,  @RequestBody() Funcionario funcionario) { 
        funcionarioService.deleteById(lojaId, funcionario); 
    }
}