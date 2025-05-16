package com.cesarschool.projetos4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.cesarschool.projetos4.entity.Faq;
import com.cesarschool.projetos4.repository.FaqRepository;

/*
 * // Buscar todas as respostas de uma pergunta (baseada no ID da pergunta)
    List<Faq> findByPerguntaPai(Faq perguntaPai);

    // Buscar a pergunta original de uma resposta
    Faq findByIdAndPerguntaPaiIsNull(Long id);

    // Buscar todas as perguntas (respostas null)
    List<Faq> findByPerguntaIsNotNull();

    // Buscar todas as respostas para uma pergunta específica
    List<Faq> findByPerguntaAndPerguntaPaiIsNotNull(String pergunta);
}
*/
@Service
public class FaqService {
     @Autowired
    private FaqRepository faqRepository;

    // Buscar todas as perguntas
    // depois – só perguntas de topo de FAQ
    public List<Faq> getAllPerguntas() {
        return faqRepository.findByPerguntaPaiIsNull();
    }


    // Buscar todas as respostas de uma pergunta específica
    public List<Faq> getRespostasPorPergunta(Long perguntaId) {
        Optional<Faq> pergunta = faqRepository.findById(perguntaId);
        if (pergunta.isPresent()) {
            return faqRepository.findByPerguntaPai(pergunta.get());
        } else {
            throw new RuntimeException("Pergunta não encontrada!");
        }
    }

    // Buscar pergunta de uma resposta
    public Faq getPerguntaDeResposta(Long respostaId) {
        Optional<Faq> resposta = faqRepository.findById(respostaId);
        if (resposta.isPresent()) {
            Faq pergunta = resposta.get().getPerguntaPai();
            if (pergunta != null) {
                return faqRepository.findByIdAndPerguntaPaiIsNull(pergunta.getId());
            } else {
                throw new RuntimeException("Resposta não possui pergunta associada!");
            }
        } else {
            throw new RuntimeException("Resposta não encontrada!");
        }
    }

    // Criar uma nova pergunta
    public Faq createPergunta(Faq faq) {
        faq.setResposta(null); // Garantir que é uma pergunta sem resposta associada
        return faqRepository.save(faq);
    }

    // Adicionar uma resposta a uma pergunta
    public Faq createResposta(Faq faq) {
        if (faq.getPerguntaPai() != null) {
            return faqRepository.save(faq);
        } else {
            throw new RuntimeException("A resposta deve estar associada a uma pergunta.");
        }
    }
}
