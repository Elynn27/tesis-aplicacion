package com.example.demo.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Estudiantiles {
    private String concurso;
    private String categoria;

    public Estudiantiles() { }

    public Estudiantiles(String concurso, String categoria) {
        this.concurso = concurso;
        this.categoria = categoria;
    }

    // Getters y setters
    public String getConcurso() {
        return concurso;
    }
    public void setConcurso(String concurso) {
        this.concurso = concurso;
    }

    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
