package com.cesarschool.projetos4.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
public class QuemSomos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cargo;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String fotoBase64;

    public QuemSomos() {
    }

    public QuemSomos(String nome, String cargo, String fotoBase64) {
        this.nome = nome;
        this.cargo = cargo;
        this.fotoBase64 = fotoBase64;
    }

}
