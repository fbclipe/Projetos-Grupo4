package com.cesarschool.projetos4.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cesarschool.projetos4.entity.QuemSomos;
import com.cesarschool.projetos4.service.QuemSomosService;
@RestController
@RequestMapping("/quemsomos")
public class QuemSomosController {
  
    @Autowired
    private QuemSomosService quemSomosService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<QuemSomos> criarDiretor(
        @RequestParam ("nome") String nome,
        @RequestParam("cargo") String cargo,
        @RequestParam ("foto") MultipartFile foto) {
            
    QuemSomos salvo = quemSomosService.salvarDiretorComFoto(nome, cargo, foto);
    return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
}

    @GetMapping("/findall")
    public ResponseEntity<List<QuemSomos>> listarTodos() {
        return ResponseEntity.ok(quemSomosService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuemSomos> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(quemSomosService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        quemSomosService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

