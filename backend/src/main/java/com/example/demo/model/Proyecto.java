package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "proyectos")
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El área es obligatoria")
    @Column(nullable = false)
    private String area;

    @NotBlank(message = "El código es obligatorio")
    @Column(nullable = false, unique = true)
    private String codigo;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 500, message = "Máximo 500 caracteres")
    @Column(nullable = false, length = 500)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @NotNull(message = "La fecha de inicio es obligatoria")
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Positive(message = "El presupuesto debe ser mayor que 0")
    @Column(nullable = false)
    private double presupuesto;

    /**
     * Clasificación: "PAPN", "PAPS", "PAPT" o "PNAP"
     */
    @NotBlank(message = "La clasificación es obligatoria")
    @Column(nullable = false, length = 50)
    private String clasificacion;

    /**
     * "INTERNA" o "EXTERNA"
     */
    @NotBlank(message = "El tipo de participación es obligatorio")
    @Column(name = "tipo_participacion", nullable = false, length = 50)
    private String tipoParticipacion;

    @NotBlank(message = "El título del programa es obligatorio")
    @Column(name = "titulo_programa", nullable = false, length = 100)
    private String tituloPrograma;

    @NotBlank(message = "El sector estratégico es obligatorio")
    @Column(name = "sector_estrategico", nullable = false, length = 100)
    private String sectorEstrategico;

    public Proyecto() { }

    // Getters y setters

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

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public double getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(double presupuesto) {
        this.presupuesto = presupuesto;
    }

    public String getClasificacion() {
        return clasificacion;
    }

    public void setClasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
    }

    public String getTipoParticipacion() {
        return tipoParticipacion;
    }

    public void setTipoParticipacion(String tipoParticipacion) {
        this.tipoParticipacion = tipoParticipacion;
    }

    public String getTituloPrograma() {
        return tituloPrograma;
    }

    public void setTituloPrograma(String tituloPrograma) {
        this.tituloPrograma = tituloPrograma;
    }

    public String getSectorEstrategico() {
        return sectorEstrategico;
    }

    public void setSectorEstrategico(String sectorEstrategico) {
        this.sectorEstrategico = sectorEstrategico;
    }
}
