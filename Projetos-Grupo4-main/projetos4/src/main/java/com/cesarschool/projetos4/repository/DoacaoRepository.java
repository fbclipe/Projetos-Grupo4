package com.cesarschool.projetos4.repository;

import com.cesarschool.projetos4.entity.Doacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DoacaoRepository extends JpaRepository<Doacao, Long> {

    // Consulta personalizada para buscar doações por tipo
    List<Doacao> findByTipo(String tipo);

    // Consulta personalizada para listar doações por data
    List<Doacao> findByDataBetween(LocalDate startDate, LocalDate endDate);

    // Consulta personalizada para buscar doações de um contribuinte específico
    List<Doacao> findByContribuinteId(Long contribuinteId);

    // Consulta para contar o número de doações de um determinado tipo
    @Query("SELECT COUNT(d) FROM Doacao d WHERE d.tipo = :tipo")
    Long countDoacoesByTipo(@Param("tipo") String tipo);
}
