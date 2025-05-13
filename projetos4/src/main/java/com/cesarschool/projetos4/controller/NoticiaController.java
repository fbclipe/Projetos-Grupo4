package com.cesarschool.projetos4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesarschool.projetos4.entity.Noticia;
import com.cesarschool.projetos4.service.NoticiaService;

@RestController
@RequestMapping("/noticias")
public class NoticiaController {

    @Autowired
    private NoticiaService noticiaService;

    @PostMapping
    public ResponseEntity<Noticia> criarNoticia(@RequestBody Noticia noticia) {
        Noticia criada = noticiaService.salvar(noticia);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @GetMapping("/findall")
    public ResponseEntity<List<Noticia>> listarNoticias() {
        return ResponseEntity.ok(noticiaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Noticia> buscarPorId(@PathVariable Long id) throws Exception {
        Noticia noticia = noticiaService.buscarPorId(id);
        return ResponseEntity.ok(noticia);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) throws Exception {
        noticiaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}


