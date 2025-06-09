package com.example.demo.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "libros")
public class Libro {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; @NotBlank(message = "El área es obligatoria")
    private String area;

    @NotBlank(message = "Los autores son obligatorios")
    private String autores;

    @NotBlank(message = "El título del libro es obligatorio")
    @Size(max = 200, message = "El título no puede exceder 200 caracteres")
    private String tituloLibro;

    @Size(max = 200, message = "El título del capítulo no puede exceder 200 caracteres")
    private String tituloCapitulo;

    @NotBlank(message = "La editorial es obligatoria")
    private String editorial;

    @Min(value = 1900, message = "El año debe ser mayor a 2002")
    @Max(value = 2100, message = "El año no puede ser mayor a 2026")
    private Integer ano;

    
    private String isbn;
  private String pais;
  private String url;
  private String grupoMes;

  // Getters y setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getArea() { return area; }
  public void setArea(String area) { this.area = area; }

  public String getAutores() { return autores; }
  public void setAutores(String autores) { this.autores = autores; }

  public String getTituloLibro() { return tituloLibro; }
  public void setTituloLibro(String tituloLibro) { this.tituloLibro = tituloLibro; }

  public String getTituloCapitulo() { return tituloCapitulo; }
  public void setTituloCapitulo(String tituloCapitulo) { this.tituloCapitulo = tituloCapitulo; }

  public String getEditorial() { return editorial; }
  public void setEditorial(String editorial) { this.editorial = editorial; }

  public Integer getAno() { return ano; }
  public void setAno(Integer ano) { this.ano = ano; }

  public String getIsbn() { return isbn; }
  public void setIsbn(String isbn) { this.isbn = isbn; }

  public String getPais() { return pais; }
  public void setPais(String pais) { this.pais = pais; }

  public String getUrl() { return url; }
  public void setUrl(String url) { this.url = url; }

  public String getGrupoMes() { return grupoMes; }
  public void setGrupoMes(String grupoMes) { this.grupoMes = grupoMes; }
}
