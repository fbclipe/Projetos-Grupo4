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

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private String forma; // Ex: "Material", "Dinheiro", "Serviço"

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Double valor; 

    @Column(nullable = false)
    private LocalDate data = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "contribuinte_id", nullable = false)
    private Contribuinte contribuinte;
}
