package br.com.samuel.lojaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import br.com.samuel.lojaapi.entity.Funcionario;
import br.com.samuel.lojaapi.entity.Loja;
import br.com.samuel.lojaapi.services.LojaService;

@RestController
@RequestMapping("/loja")
public class LojaController {
    
    @Autowired
    private LojaService lojaService;

    @GetMapping("/{id}")
    public Loja buscarLojaPorId(@PathVariable("id") Integer id) { 
        return lojaService.buscarLojaPorId(id); 
    }

    @GetMapping
    public Page<Loja> bsucarTodasAsLojas(@RequestParam("filtro") String filtro, Pageable pageable) { 
        return lojaService.buscarTodasAsLojas(filtro, pageable); 
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Integer criarLoja(@RequestBody() Loja loja) { 
        return lojaService.criarOuEditarLoja(loja); 
    }

    @PutMapping
    public Integer editarLoja(@RequestBody() Loja loja) { 
        return lojaService.criarOuEditarLoja(loja); 
    }

    @DeleteMapping("/{id}")
    public void excluirLoja(@PathVariable("id") Integer id) { 
        lojaService.excluirLojaPorId(id); 
    }
    
    @GetMapping("/{id}/funcionarios")
    public Page<Funcionario> buscarFuncionarios(
			                                        @PathVariable("id") Integer id,
			                                        @RequestParam("filtro") String filtro,
			                                        Pageable pageable
                                    			)
    {
        return lojaService.buscarFuncionariosPorIdLoja(id, filtro, pageable); 
    }

    @PostMapping("/{id}/funcionarios")
    @ResponseStatus(HttpStatus.CREATED)
    public void adicionarFuncionarios(@PathVariable("id") Integer id, @RequestBody() Funcionario funcionario) { 
    	lojaService.adicionarFuncionario(id, funcionario); 
    }

    @PutMapping("/{id}/funcionarios")
    public void editarFuncionario(@PathVariable("id") Integer id, @RequestBody() Funcionario funcionario) { 
    	lojaService.editarFuncionario(id, funcionario); 
    }
    
    @DeleteMapping("/{id}/funcionarios")
    public void excluirFuncionario(@PathVariable("id") Integer id,  @RequestBody() Funcionario funcionario) { 
        lojaService.excluirFuncionario(id, funcionario); 
    }
}