package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "eventos")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El área es obligatoria")
    private String area;

    @NotBlank(message = "Los autores son obligatorios")
    private String autores;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 200, message = "Máximo 200 caracteres")
    private String titulo;

    @NotBlank(message = "La descripción es obligatoria")
    @Column(length = 1000)
    private String descripcion;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @NotBlank(message = "El lugar es obligatorio")
    private String lugar;

    @NotBlank(message = "La categoría es obligatoria")
    private String categoria;

    @NotBlank(message = "La línea es obligatoria")
    private String linea;

    @NotBlank(message = "El proyecto es obligatorio")
    private String proyecto;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getAutores() { return autores; }
    public void setAutores(String autores) { this.autores = autores; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }


    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public String getLugar() {return lugar;}
    public void setLugar( String lugar) {this.lugar = lugar;}

    public String getCategoria() { return categoria;}
    public void setCategoria(String categoria) {this.categoria = categoria;}

    public String getLinea() { return linea;}
    public void setLinea(String linea) {this.linea = linea;}

    public String getProyecto() { return proyecto;}
    public void setProyecto(String proyecto) {this.proyecto = proyecto;}

    

     



    

   
    
}