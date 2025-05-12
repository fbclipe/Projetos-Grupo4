package com.cesarschool.projetos4.controller;

import com.cesarschool.projetos4.entity.Contribuinte;
import com.cesarschool.projetos4.service.ContribuinteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contribuintes")
public class ContribuinteController {

    @Autowired
    private ContribuinteService contribuinteService;

    @PostMapping
    public ResponseEntity<?> criarContribuinte(@RequestBody Contribuinte contribuinte) {
        Contribuinte novo = contribuinteService.salvarOuAtualizarContribuinte(contribuinte);
        return ResponseEntity.ok(novo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Contribuinte contribuinte = contribuinteService.buscarPorId(id);
        return contribuinte != null ? ResponseEntity.ok(contribuinte) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<?>> listarTodos() {
        return ResponseEntity.ok(contribuinteService.listarTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarContribuinte(@PathVariable Long id, @RequestBody Contribuinte contribuinte) {
        Contribuinte atualizado = contribuinteService.atualizarContribuinte(id, contribuinte);
        return atualizado != null ? ResponseEntity.ok(atualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        contribuinteService.deletarContribuinte(id);
        return ResponseEntity.noContent().build();
    }
}
