package com.cesarschool.projetos4.service;

import com.cesarschool.projetos4.entity.Contribuinte;
import com.cesarschool.projetos4.entity.Doacao;
import com.cesarschool.projetos4.repository.ContribuinteRepository;
import com.cesarschool.projetos4.repository.DoacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ContribuinteService {

    @Autowired
    private ContribuinteRepository contribuinteRepository;

    @Autowired
    private DoacaoRepository doacaoRepository;

    // Criar ou atualizar um contribuinte
    public Contribuinte salvarOuAtualizarContribuinte(Contribuinte contribuinte) {
        if (contribuinte.getId() == null) {
            return contribuinteRepository.save(contribuinte); // Novo
        } else {
            return atualizarContribuinte(contribuinte.getId(), contribuinte);
        }
    }

    // Método de atualização personalizada
    public Contribuinte atualizarContribuinte(Long id, Contribuinte contribuinteAtualizado) {
        int resultado = contribuinteRepository.updateContribuinte(
                id, contribuinteAtualizado.getNomeCompleto(), 
                contribuinteAtualizado.getTelefone(),
                contribuinteAtualizado.getEstado(),
                contribuinteAtualizado.getCidade(), 
                contribuinteAtualizado.getRua(),
                contribuinteAtualizado.getNumero());
        
        if (resultado > 0) {
            return contribuinteRepository.findById(id).orElse(null);
        }
        return null;
    }

    // Deletar contribuinte
    public void deletarContribuinte(Long id) {
        contribuinteRepository.deleteById(id);
    }

    // Buscar por nome
    public List<Contribuinte> buscarContribuintePorNome(String nome) {
        return contribuinteRepository.findByNomeCompleto(nome);
    }

    // Buscar doações de um contribuinte
    public List<Doacao> listarDoacoesPorContribuinte(Long contribuinteId) {
        return doacaoRepository.findByContribuinteId(contribuinteId);
    }

    // Buscar doações por tipo
    public List<Doacao> buscarDoacoesPorTipo(String tipo) {
        return doacaoRepository.findByTipo(tipo);
    }
    public Contribuinte buscarPorId(Long id) {
        return contribuinteRepository.findById(id).orElse(null);
    }
    
    public List<Contribuinte> listarTodos() {
        return contribuinteRepository.findAll();
    }
    
}
