package com.cesarschool.projetos4.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cesarschool.projetos4.entity.Noticia;
@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long> {

}

