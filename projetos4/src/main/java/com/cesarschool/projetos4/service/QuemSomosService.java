package com.cesarschool.projetos4.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cesarschool.projetos4.entity.QuemSomos;
import com.cesarschool.projetos4.repository.QuemSomosRepository;

@Service
public class QuemSomosService {
     @Autowired
    private QuemSomosRepository quemSomosRepository;

    public QuemSomos salvarDiretorComFoto(String nome, String cargo, MultipartFile foto) {
        String base64Foto = null;

        if (foto != null && !foto.isEmpty()) {
            try {
                base64Foto = Base64.getEncoder().encodeToString(foto.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Erro ao codificar a imagem", e);
            }
        }

        QuemSomos diretor = new QuemSomos(nome, cargo, base64Foto);
        return quemSomosRepository.save(diretor);
    }

    public List<QuemSomos> listarTodos() {
        return quemSomosRepository.findAll();
    }

    public QuemSomos buscarPorId(Long id) {
        return quemSomosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diretor não encontrado"));
    }

    public void deletar(Long id) {
        if (!quemSomosRepository.existsById(id)) {
            throw new RuntimeException("Diretor não encontrado");
        }
        quemSomosRepository.deleteById(id);
    }
}
