package com.example.demo.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Provinciales {
    private String tipo;
    private String provincia;
    private String ejecutor;
    private String participante;

    public Provinciales() { }

    public Provinciales(String tipo, String provincia, String ejecutor, String participante) {
        this.tipo = tipo;
        this.provincia = provincia;
        this.ejecutor = ejecutor;
        this.participante = participante;
    }

    // Getters y setters
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getProvincia() {
        return provincia;
    }
    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getEjecutor() {
        return ejecutor;
    }
    public void setEjecutor(String ejecutor) {
        this.ejecutor = ejecutor;
    }

    public String getParticipante() {
        return participante;
    }
    public void setParticipante(String participante) {
        this.participante = participante;
    }
}
