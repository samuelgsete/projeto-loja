package br.com.samuel.lojaapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    
    public Page<Funcionario> findByIdLoja(Integer lojaId, String filtro, Pageable pageable) {
        return funcionarioRepository.findByIdLoja(lojaId, filtro.toLowerCase(), pageable);
    }

    public void save(Integer lojaId, Funcionario funcionario) { 
        Loja loja = lojaService.findById(lojaId);
        funcionario.setLoja(loja);
        loja.adicionarFuncionario(funcionario);
        lojaService.saveOrUpdate(loja);
    }

    public void update(Integer lojaId, Funcionario funcionario) {
        Loja loja = lojaService.findById(lojaId);
        funcionario.setLoja(loja);
        loja.atualizarFuncionario(funcionario);
        lojaService.saveOrUpdate(loja);
    }

    public void deleteById(Integer lojaId, Funcionario funcionario) {
        Loja loja = lojaService.findById(lojaId);
        loja.removerFuncionario(funcionario);
        lojaService.saveOrUpdate(loja);
        funcionarioRepository.delete(funcionario);
    }
}