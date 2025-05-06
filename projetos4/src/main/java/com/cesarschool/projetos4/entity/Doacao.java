package com.cesarschool.projetos4.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Doacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    private String forma; // Ex: "Material", "Dinheiro", "Serviço"

    private String descricao;

    private Double valor; 

    private LocalDate data = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "contribuinte_id", nullable = false)
    private Contribuinte contribuinte;
}
