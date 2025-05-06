package com.cesarschool.projetos4.service;

import com.cesarschool.projetos4.entity.Evento;
import com.cesarschool.projetos4.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public Evento criarOuAtualizarEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    public Evento buscarPorId(Long id) {
        Optional<Evento> evento = eventoRepository.findById(id);
        return evento.orElse(null);
    }

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public Evento atualizarEvento(Long id, Evento eventoAtualizado) {
        Evento existente = buscarPorId(id);
        if (existente != null) {
            existente.setTitulo(eventoAtualizado.getTitulo());
            existente.setDescricao(eventoAtualizado.getDescricao());
            existente.setData(eventoAtualizado.getData());
            existente.setLink(eventoAtualizado.getLink());
            existente.setParceiros(eventoAtualizado.getParceiros());
            return eventoRepository.save(existente);
        }
        return null;
    }

    public void deletarEvento(Long id) {
        eventoRepository.deleteById(id);
    }
}
