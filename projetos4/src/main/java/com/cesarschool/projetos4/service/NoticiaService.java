package com.cesarschool.projetos4.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cesarschool.projetos4.entity.Noticia;
import com.cesarschool.projetos4.repository.NoticiaRepository;

@Service
public class NoticiaService {
    @Autowired
    private NoticiaRepository noticiaRepository;

    public Noticia salvar(Noticia noticia) {
        noticia.setDataPublicacao(LocalDateTime.now());
        return noticiaRepository.save(noticia);
    }

    public List<Noticia> listarTodas() {
        return noticiaRepository.findAll(Sort.by(Sort.Direction.DESC, "dataPublicacao"));
    }

    public Noticia buscarPorId(Long id) throws Exception {
        Optional<Noticia> noticia = noticiaRepository.findById(id);
        if (noticia.isEmpty()) {
            throw new Exception();
        }
        return noticia.get();
    }

    public void deletar(Long id) throws Exception {
        if (!noticiaRepository.existsById(id)) {
            throw new Exception();
        }
        noticiaRepository.deleteById(id);
    }
}
