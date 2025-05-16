package com.cesarschool.projetos4.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cesarschool.projetos4.entity.Faq;
import com.cesarschool.projetos4.entity.User;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long>  {
    
    // Buscar todas as respostas de uma pergunta (baseada no ID da pergunta)
    List<Faq> findByPerguntaPai(Faq perguntaPai);

    // Buscar a pergunta original de uma resposta
    Faq findByIdAndPerguntaPaiIsNull(Long id);

    List<Faq> findByPerguntaPaiIsNull();

    // Buscar todas as perguntas (respostas null)
    List<Faq> findByPerguntaIsNotNull();
}

