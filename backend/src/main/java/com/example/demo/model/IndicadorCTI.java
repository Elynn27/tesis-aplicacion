package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "indicadores_cti")
public class IndicadorCTI {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    

    // Por ejemplo: "4/9"
    @Column(nullable = false, length = 10)
    private String oe;

    @Column(nullable = false, length = 255)
    private String nombre;

    // Meta esperada
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal meta;

    // Valor real (puede ser BigDecimal o null si no aplica)
    @Column(precision = 10, scale = 2)
    private BigDecimal real;

    // Porcentaje de cumplimiento (0.0 a 100.0)
    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal porcentajeCumplimiento;

   
    

    

   

    // Getters y setters (omito por brevedad, pero asegúrate de crearlos todos)

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

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getMeta() {
        return meta;
    }

    public void setMeta(BigDecimal meta) {
        this.meta = meta;
    }

    public BigDecimal getReal() {
        return real;
    }

    public void setReal(BigDecimal real) {
        this.real = real;
    }

    public BigDecimal getPorcentajeCumplimiento() {
        return porcentajeCumplimiento;
    }

    public void setPorcentajeCumplimiento(BigDecimal porcentajeCumplimiento) {
        this.porcentajeCumplimiento = porcentajeCumplimiento;
    }

   

  
}
