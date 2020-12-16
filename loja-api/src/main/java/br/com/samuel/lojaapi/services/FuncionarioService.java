package br.com.samuel.lojaapi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.samuel.lojaapi.entity.FiltroBusca;
import br.com.samuel.lojaapi.entity.Funcionario;
import br.com.samuel.lojaapi.entity.Loja;
import br.com.samuel.lojaapi.entity.Tupla;
import br.com.samuel.lojaapi.exceptions.models.NotFoundException;
import br.com.samuel.lojaapi.repository.FuncionarioRepository;

@Service
public class FuncionarioService {
    
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private LojaService lojaService;
    
    public Tupla<Funcionario> findByIdLoja(Integer lojaId, FiltroBusca filtro) throws NotFoundException {
        Loja loja = lojaService.findById(lojaId);
        if(loja == null) {
            throw new NotFoundException("Loja não cadastrada");
        }

        List<Funcionario> funcionarios = new ArrayList<Funcionario>(loja.getFuncionarios());
        funcionarios = funcionarios
            .stream()
            .filter( funcionario -> funcionario.getNome().toLowerCase().contains(filtro.palavra))
            .collect(Collectors.toList());

        int total = funcionarios.size();
        int fromIndex = (filtro.pagina - 1) * filtro.tamanho;
        int toIndex = (filtro.pagina * filtro.tamanho) < funcionarios.size() ? filtro.pagina * filtro.tamanho : funcionarios.size();
        funcionarios = funcionarios.subList(fromIndex, toIndex);
        return new Tupla<Funcionario>(total, funcionarios);
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