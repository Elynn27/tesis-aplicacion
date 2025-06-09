package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entidad JPA que refleja la tabla “premios” exactamente tal cual está en la BD.
 */
@Entity
@Table(name = "premios")
public class Premio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===========================
    // Campos obligatorios (NOT NULL)
    // ===========================
    @Column(name = "area", nullable = false)
    private String area;

    @Column(name = "autores", nullable = false)
    private String autores;

    @Column(name = "titulo_resultado", nullable = false)
    private String tituloResultado;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    /**
     * “detalles” es jsonb en la BD. Aquí lo mapeamos a String puro.
     * Si prefieres, puedes usar JsonNode o Map<String,Object> y 
     * un convertidor de Hibernate para jsonb, pero lo más sencillo
     * es guardarlo/recuperarlo como String con columnDefinition="jsonb".
     */
    @Column(name = "detalles", nullable = false, columnDefinition = "jsonb")
    private String detalles;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "proyecto", nullable = false)
    private String proyecto;

    // ===========================
    // Campos opcionales (permiten NULL)
    // ===========================
    @Column(name = "fecha_registro", nullable = true)
    private LocalDateTime fechaRegistro;

    @Column(name = "ultima_actualizacion", nullable = true)
    private LocalDateTime ultimaActualizacion;

    @Column(name = "categoria", nullable = true)
    private String categoria;

    @Column(name = "concurso", nullable = true)
    private String concurso;

    @Column(name = "otros_nacionales", nullable = true)
    private String otrosNacionales;

    @Column(name = "premioacc", nullable = true)
    private String premioacc;

    @Column(name = "ejecutor", nullable = true)
    private String ejecutor;

    @Column(name = "participante", nullable = true)
    private String participante;

    @Column(name = "provincia", nullable = true)
    private String provincia;

    @Column(name = "tipo_resultado", nullable = true)
    private String tipoResultado;

    // ===========================
    // Constructores, getters y setters
    // ===========================

    public Premio() {
    }

    /** Constructor con todos los campos opcionales y obligatorios. */
    public Premio(
        String area,
        String autores,
        String tituloResultado,
        String tipo,
        String detalles,
        LocalDate fecha,
        String proyecto,
        LocalDateTime fechaRegistro,
        LocalDateTime ultimaActualizacion,
        String categoria,
        String concurso,
        String otrosNacionales,
        String premioacc,
        String ejecutor,
        String participante,
        String provincia,
        String tipoResultado
    ) {
        this.area = area;
        this.autores = autores;
        this.tituloResultado = tituloResultado;
        this.tipo = tipo;
        this.detalles = detalles;
        this.fecha = fecha;
        this.proyecto = proyecto;
        this.fechaRegistro = fechaRegistro;
        this.ultimaActualizacion = ultimaActualizacion;
        this.categoria = categoria;
        this.concurso = concurso;
        this.otrosNacionales = otrosNacionales;
        this.premioacc = premioacc;
        this.ejecutor = ejecutor;
        this.participante = participante;
        this.provincia = provincia;
        this.tipoResultado = tipoResultado;
    }

    public Long getId() {
        return id;
    }

    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }

    public String getAutores() {
        return autores;
    }
    public void setAutores(String autores) {
        this.autores = autores;
    }

    public String getTituloResultado() {
        return tituloResultado;
    }
    public void setTituloResultado(String tituloResultado) {
        this.tituloResultado = tituloResultado;
    }

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDetalles() {
        return detalles;
    }
    public void setDetalles(String detalles) {
        this.detalles = detalles;
    }

    public LocalDate getFecha() {
        return fecha;
    }
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getProyecto() {
        return proyecto;
    }
    public void setProyecto(String proyecto) {
        this.proyecto = proyecto;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }
    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public LocalDateTime getUltimaActualizacion() {
        return ultimaActualizacion;
    }
    public void setUltimaActualizacion(LocalDateTime ultimaActualizacion) {
        this.ultimaActualizacion = ultimaActualizacion;
    }

    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getConcurso() {
        return concurso;
    }
    public void setConcurso(String concurso) {
        this.concurso = concurso;
    }

    public String getOtrosNacionales() {
        return otrosNacionales;
    }
    public void setOtrosNacionales(String otrosNacionales) {
        this.otrosNacionales = otrosNacionales;
    }

    public String getPremioacc() {
        return premioacc;
    }
    public void setPremioacc(String premioacc) {
        this.premioacc = premioacc;
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

    public String getProvincia() {
        return provincia;
    }
    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getTipoResultado() {
        return tipoResultado;
    }
    public void setTipoResultado(String tipoResultado) {
        this.tipoResultado = tipoResultado;
    }
}
