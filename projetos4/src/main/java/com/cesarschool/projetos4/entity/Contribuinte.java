package com.cesarschool.projetos4.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
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

public class Contribuinte extends User {
    private String nomeCompleto;

    private String telefone;

    @Column(unique = true)
    private String cpf;

    private String estado;
    private String cidade;
    private String rua;
    private String numero;

    @ElementCollection
    private List<String> formasDeDoacao; // Ex: ["Material", "Dinheiro", "Serviço"]
    private String tipoContribuinte;
    private String frequenciaPreferida; // Ex: "Mensal", "Eventual"
    private LocalDate dataDoacao;
    private boolean ativo = true;
    @OneToMany(mappedBy = "contribuinte", cascade = CascadeType.ALL)
    private List<Doacao> doacoes = new ArrayList<>();

    public Object getId() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
