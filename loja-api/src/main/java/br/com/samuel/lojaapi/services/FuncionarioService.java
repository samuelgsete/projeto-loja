package br.com.samuel.lojaapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.samuel.lojaapi.entity.Funcionario;
import br.com.samuel.lojaapi.entity.Loja;
import br.com.samuel.lojaapi.repository.FuncionarioRepository;

@Service
public class FuncionarioService {
    
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private LojaService lojaService;
    
    public List<Funcionario> findByIdLoja(Integer lojaId) { 
        Loja loja = lojaService.findById(lojaId);
        return new ArrayList<Funcionario>(loja.getFuncionarios());
    }

    public void save(Integer lojaId, Funcionario funcionario) { 
        Loja loja = lojaService.findById(lojaId);
        loja.adicionarFuncionario(funcionario);
        lojaService.saveOrUpdate(loja);
    }

    public void update(Integer lojaId, Funcionario funcionarioAtualizado) {
        Loja loja = lojaService.findById(lojaId);
        loja.atualizarFuncionario(funcionarioAtualizado);
        lojaService.saveOrUpdate(loja);
    }

    public void deleteById(Integer lojaId, Funcionario funcionario) {
        Loja loja = lojaService.findById(lojaId);
        loja.removerFuncionario(funcionario);
        lojaService.saveOrUpdate(loja);
        funcionarioRepository.delete(funcionario);
    }
}