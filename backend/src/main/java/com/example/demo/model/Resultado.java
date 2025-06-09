package  com.example.demo.model;

import jakarta.persistence.*;


@Entity
@Table(name = "resultados_introducidos")
public class Resultado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String area;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String resultado;
    
    @Column(name = "tipo_impacto", nullable = false)
    private String tipoImpacto;
    
    @Column(name = "valoracion_cualitativa", columnDefinition = "TEXT")
    private String valoracionCualitativa;
    
    @Column(nullable = false)
    private double valor;
    
    @Column(name = "sectores_estrategicos", columnDefinition = "TEXT")
    private String sectoresEstrategicos;
    // Constructor vacío
    public Resultado() {}

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

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    public String getTipoImpacto() {
        return tipoImpacto;
    }

    public void setTipoImpacto(String tipoImpacto) {
        this.tipoImpacto = tipoImpacto;
    }

    public String getValoracionCualitativa() {
        return valoracionCualitativa;
    }

    public void setValoracionCualitativa(String valoracionCualitativa) {
        this.valoracionCualitativa = valoracionCualitativa;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public String getSectoresEstrategicos() {
        return sectoresEstrategicos == null ? "" : sectoresEstrategicos;
    }

    public void setSectoresEstrategicos(String sectoresEstrategicos) {        
        this.sectoresEstrategicos = sectoresEstrategicos == null ? "" : sectoresEstrategicos;
    }
}