package br.com.samuel.lojaapi.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.samuel.lojaapi.entity.Funcionario;
import br.com.samuel.lojaapi.entity.Loja;
import br.com.samuel.lojaapi.repository.FuncionarioRepository;
import br.com.samuel.lojaapi.repository.LojaRepository;

@Service
public class LojaService {
    
    @Autowired
    private LojaRepository lojaRepository;
    
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Loja buscarLojaPorId(Integer id) { 
        Optional<Loja> loja = lojaRepository.findById(id);
        if(loja.isPresent()) {
            return loja.get();
        }
        return null;
    }
    
    public Page<Loja> buscarTodasAsLojas(String filtro, Pageable pageable) { 
        return lojaRepository.findByFilter(filtro, pageable);
    }

    public Integer criarOuEditarLoja(Loja loja) { 
        return lojaRepository.save(loja).getId(); 
    }

    public void excluirLojaPorId(Integer id) {
        lojaRepository.deleteById(id);
    }
    
    public Page<Funcionario> buscarFuncionariosPorIdLoja(Integer lojaId, String filtro, Pageable pageable) {
        return funcionarioRepository.findByIdLoja(lojaId, filtro.toLowerCase(), pageable);
    }
    
    public void adicionarFuncionario(Integer lojaId, Funcionario funcionario) { 
        Loja loja = buscarLojaPorId(lojaId);
        funcionario.setLoja(loja);
        loja.adicionarFuncionario(funcionario);
        criarOuEditarLoja(loja);
    }

    public void editarFuncionario(Integer lojaId, Funcionario funcionarioAtualizado) {
    	Loja loja = buscarLojaPorId(lojaId);
    	funcionarioAtualizado.setLoja(loja);
    	funcionarioRepository.save(funcionarioAtualizado);
    	
    }

    public void excluirFuncionario(Integer lojaId, Funcionario funcionario) {
    	Loja loja = buscarLojaPorId(lojaId);
        loja.removerFuncionario(funcionario);
        criarOuEditarLoja(loja);
        funcionarioRepository.delete(funcionario);
    }
}