package com.cesarschool.projetos4.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Table(name = "FAQ")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
/*
 * atributos podem ser nulos pelo fato de que um usuario pode querer apenas mandar  
 * uma pergunta ou o contrario , o usuario poder apenas querer responder uma pergunta
*/
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500)  
    private String pergunta; 

    @Column(columnDefinition = "TEXT")
    private String resposta;

    @ManyToOne
    @JoinColumn(name = "pergunta_id")
    @JsonBackReference
    private Faq perguntaPai;

    @OneToMany(mappedBy = "perguntaPai", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Faq> respostasDeUmaPergunta;
    

}
