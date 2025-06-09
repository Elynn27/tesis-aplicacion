package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "expertos")
public class Experto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El área es obligatoria")
    private String area;

    @NotBlank(message = "El nombre completo es obligatorio")
    private String nombreApellidos;

    @NotBlank(message = "El grado científico es obligatorio")
    private String gradoCientifico;

    @NotBlank(message = "El área de conocimiento es obligatoria")
    private String areaConocimiento;

    @NotBlank(message = "La instancia asesora es obligatoria")
    private String instanciaAsesora;

    @NotBlank(message = "El programa es obligatorio")
    private String programa;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getNombreApellidos() { return nombreApellidos; }
    public void setNombreApellidos(String nombreApellidos) { this.nombreApellidos = nombreApellidos; }

    public String getGradoCientifico() { return gradoCientifico; }
    public void setGradoCientifico(String gradoCientifico) { this.gradoCientifico = gradoCientifico; }

    public String getAreaConocimiento() { return areaConocimiento; }
    public void setAreaConocimiento(String areaConocimiento) { this.areaConocimiento = areaConocimiento; }

    public String getInstanciaAsesora() { return instanciaAsesora; }
    public void setInstanciaAsesora(String instanciaAsesora) { this.instanciaAsesora = instanciaAsesora; }

    public String getPrograma() { return programa; }
    public void setPrograma(String programa) { this.programa = programa; }
}