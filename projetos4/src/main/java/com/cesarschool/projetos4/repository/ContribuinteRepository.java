package com.cesarschool.projetos4.repository;

import com.cesarschool.projetos4.entity.Contribuinte;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContribuinteRepository extends JpaRepository<Contribuinte, Long> {
    
    // Consulta personalizada para encontrar um contribuinte pelo nome
    @Query("SELECT c FROM Contribuinte c WHERE c.nomeCompleto LIKE %:nome%")
    List<Contribuinte> findByNomeCompleto(@Param("nome") String nome);

    // Método para atualizar um contribuinte customizado (não existe diretamente no JpaRepository)
    @Query("UPDATE Contribuinte c SET c.nomeCompleto = :nomeCompleto, c.telefone = :telefone, " +
            "c.estado = :estado, c.cidade = :cidade, c.rua = :rua, c.numero = :numero " +
            "WHERE c.id = :id")
    int updateContribuinte(@Param("id") Long id, @Param("nomeCompleto") String nomeCompleto, 
                           @Param("telefone") String telefone, @Param("estado") String estado,
                           @Param("cidade") String cidade, @Param("rua") String rua, 
                           @Param("numero") String numero);

    // Busca um contribuinte pelo CPF (único)
    Optional<Contribuinte> findByCpf(String cpf);
}
