package com.cesarschool.projetos4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesarschool.projetos4.entity.Faq;
import com.cesarschool.projetos4.service.FaqService;

@RestController
@RequestMapping("/faqs")
public class FaqController {
    @Autowired
    private FaqService faqService;

    // mostra todas as perguntas
    @GetMapping("/perguntas")
    public List<Faq> getAllPerguntas() {
        return faqService.getAllPerguntas();
    }

    // Exibir respostas para uma pergunta específica
    @GetMapping("/respostas/{perguntaId}")
    public List<Faq> getRespostas(@PathVariable Long perguntaId) {
        return faqService.getRespostasPorPergunta(perguntaId);
    }

    // Exibir a pergunta de uma resposta
    @GetMapping("/pergunta/{respostaId}")
    public Faq getPerguntaByResposta(@PathVariable Long respostaId) {
        return faqService.getPerguntaDeResposta(respostaId);
    }

    // Criar uma nova pergunta
    @PostMapping("/pergunta")
    public Faq createPergunta(@RequestBody Faq faq) {
        return faqService.createPergunta(faq);
    }
   
    // Adicionar uma resposta a uma pergunta
    @PostMapping("/resposta")
    public Faq createResposta(@RequestBody Faq faq) {
        return faqService.createResposta(faq);
    }
}
