package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "publicaciones")
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El área es obligatoria")
    private String area;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 500, message = "El título no puede exceder 500 caracteres")
    private String titulo;

    @NotBlank(message = "Los autores son obligatorios")
    private String autores;

    @NotBlank(message = "La revista es obligatoria")
    private String revista;

    @NotNull(message = "El año es obligatorio")
    @Min(value = 1900, message = "El año debe ser mayor o igual a 1900")
    @Max(value = 2100, message = "El año no puede ser mayor a 2100")
    private Integer ano;

    private String numeroVolumen;

    @Pattern(regexp = "\\d{4}-\\d{4}", message = "Formato ISSN inválido (ej: 1234-5678)")
    private String issn;

    private String baseDatos;

    @NotBlank(message = "La línea de investigación es obligatoria")
    private String linea;

    @NotBlank(message = "El grupo/mes es obligatorio")
    private String grupoMes;

    @NotBlank(message = "La URL es obligatoria")
    @Size(max = 1000, message = "La URL no puede exceder 1000 caracteres")
    private String url;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getAutores() { return autores; }
    public void setAutores(String autores) { this.autores = autores; }
    public String getRevista() { return revista; }
    public void setRevista(String revista) { this.revista = revista; }
    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }
    public String getNumeroVolumen() { return numeroVolumen; }
    public void setNumeroVolumen(String numeroVolumen) { this.numeroVolumen = numeroVolumen; }
    public String getIssn() { return issn; }
    public void setIssn(String issn) { this.issn = issn; }
    public String getBaseDatos() { return baseDatos; }
    public void setBaseDatos(String baseDatos) { this.baseDatos = baseDatos; }
    public String getLinea() { return linea; }
    public void setLinea(String linea) { this.linea = linea; }
    public String getGrupoMes() { return grupoMes; }
    public void setGrupoMes(String grupoMes) { this.grupoMes = grupoMes; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}