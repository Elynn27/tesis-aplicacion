// src/main/java/com/example/demo/model/IndicadorMeta.java
package com.example.demo.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "metas")
public class IndicadorMeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Columna “oe” en la tabla
    @Column(name = "oe", length = 10)
    private String oe;

    // Columna “indicador” en la tabla (texto largo)
    @Column(name = "indicador", length = 500, nullable = false)
    private String indicador;

    // Columna “meta_valor” en la tabla (NUMERIC(12,2))
    @Column(name = "meta_valor", nullable = false, precision = 12, scale = 2)
    @JsonProperty("metavalor") 
    private BigDecimal meta_valor;

    // Constructor vacío obligado por JPA
    public IndicadorMeta() { }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOe() {
        return oe;
    }

    public void setOe(String oe) {
        this.oe = oe;
    }

    public String getIndicador() {
        return indicador;
    }

    public void setIndicador(String indicador) {
        this.indicador = indicador;
    }

    public BigDecimal getMeta_valor() {
        return meta_valor;
    }

    public void setMeta_valor(BigDecimal meta_valor) {
        this.meta_valor = meta_valor;
    }
}
