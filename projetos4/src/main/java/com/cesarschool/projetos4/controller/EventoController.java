package com.cesarschool.projetos4.controller;

import com.cesarschool.projetos4.entity.Evento;
import com.cesarschool.projetos4.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    // POST http://localhost:8080/api/eventos/cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<Evento> criarEvento(@RequestBody Evento evento) {
        Evento novo = eventoService.criarOuAtualizarEvento(evento);
        return ResponseEntity.ok(novo);
    }

    // GET http://localhost:8080/api/eventos/buscar/{id}
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Evento> buscarPorId(@PathVariable Long id) {
        Evento evento = eventoService.buscarPorId(id);
        return evento != null ? ResponseEntity.ok(evento) : ResponseEntity.notFound().build();
    }

    // GET http://localhost:8080/api/eventos/listar
    @GetMapping("/listar")
    public ResponseEntity<List<Evento>> listarTodos() {
        return ResponseEntity.ok(eventoService.listarTodos());
    }

    // PUT http://localhost:8080/api/eventos/atualizar/{id}
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Evento> atualizarEvento(@PathVariable Long id, @RequestBody Evento evento) {
        Evento atualizado = eventoService.atualizarEvento(id, evento);
        return atualizado != null ? ResponseEntity.ok(atualizado) : ResponseEntity.notFound().build();
    }

    // DELETE http://localhost:8080/api/eventos/deletar/{id}
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        eventoService.deletarEvento(id);
        return ResponseEntity.noContent().build();
    }
}
