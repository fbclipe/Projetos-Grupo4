package com.cesarschool.projetos4.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Contribuinte {
    private String nomeCompleto;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String telefone;

    @Column(unique = true)
    private String cpf;

    @Column(nullable = false)
    private String estado;
    @Column(nullable = false)
    private String cidade;
    @Column(nullable = false)
    private String rua;
    @Column(nullable = false)
    private String numero;

    @ElementCollection
    private List<String> formasDeDoacao; // Ex: ["Material", "Dinheiro", "Serviço"]
    private String tipoContribuinte;
    private String frequenciaPreferida; // Ex: "Mensal", "Eventual"
    private LocalDate dataDoacao;
    private boolean ativo = true;
    @OneToMany(mappedBy = "contribuinte", cascade = CascadeType.ALL)
    private List<Doacao> doacoes = new ArrayList<>();

}
