package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "grupos_cientificos")
public class GrupoCientifico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La facultad es obligatoria")
    private String facultad;

    @NotBlank(message = "El nombre del grupo es obligatorio")
    private String nombre;

    @NotNull(message = "El año es obligatorio")
    @Min(value = 2000, message = "El año debe ser mayor o igual a 2000")
    @Max(value = 2100, message = "El año no puede ser mayor a 2100")
    private Integer anio;

    @NotBlank(message = "La carrera es obligatoria")
    private String carrera;

    @NotBlank(message = "Debe especificar los estudiantes")
    private String estudiantes;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFacultad() { return facultad; }
    public void setFacultad(String facultad) { this.facultad = facultad; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public String getCarrera() { return carrera; }
    public void setCarrera(String carrera) { this.carrera = carrera; }

    public String getEstudiantes() { return estudiantes; }
    public void setEstudiantes(String estudiantes) { this.estudiantes = estudiantes; }
}