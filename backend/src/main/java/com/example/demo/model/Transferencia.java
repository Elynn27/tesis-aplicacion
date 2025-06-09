package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "transferencias")
public class Transferencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String area;
    
    @Column(nullable = false)
    private int numero;
    
    @Column(nullable = false)
    private String tecnologia;
    
    @Column(name = "valor_total", nullable = false)
    private double valorTotal;
    
    private Double equipamiento;
    private Double asistenciaTecnica;
    private Double propiedadIntelectual;
    private Double formacionEntrenamiento;
    private String otros;
    private String descripcion;
    
    @Column(name = "sector_estrategico", nullable = false)
    private String sectorEstrategico;

    // Constructor vacío
    public Transferencia() {}

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getTecnologia() {
        return tecnologia;
    }

    public void setTecnologia(String tecnologia) {
        this.tecnologia = tecnologia;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Double getEquipamiento() {
        return equipamiento;
    }

    public void setEquipamiento(Double equipamiento) {
        this.equipamiento = equipamiento;
    }

    public Double getAsistenciaTecnica() {
        return asistenciaTecnica;
    }

    public void setAsistenciaTecnica(Double asistenciaTecnica) {
        this.asistenciaTecnica = asistenciaTecnica;
    }

    public Double getPropiedadIntelectual() {
        return propiedadIntelectual;
    }

    public void setPropiedadIntelectual(Double propiedadIntelectual) {
        this.propiedadIntelectual = propiedadIntelectual;
    }

    public Double getFormacionEntrenamiento() {
        return formacionEntrenamiento;
    }

    public void setFormacionEntrenamiento(Double formacionEntrenamiento) {
        this.formacionEntrenamiento = formacionEntrenamiento;
    }

    public String getOtros() {
        return otros;
    }

    public void setOtros(String otros) {
        this.otros = otros;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getSectorEstrategico() {
        return sectorEstrategico;
    }

    public void setSectorEstrategico(String sectorEstrategico) {
        this.sectorEstrategico = sectorEstrategico;
    }
}