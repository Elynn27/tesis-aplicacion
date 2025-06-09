// src/main/java/com/ejemplo/premios/controller/PremioController.java
package com.example.demo.controller;

import com.example.demo.model.Premio;

import com.example.demo.repository.PremioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/premios")
@CrossOrigin(origins = "http://localhost:4200") // Ajusta según tu origen de Angular
public class PremioController {

    private final PremioRepository premioRepository;

    @Autowired
    public PremioController(PremioRepository premioRepository) {
        this.premioRepository = premioRepository;
    }

    /**
     * GET /api/premios
     * Recupera todos los premios.
     */
    @GetMapping
    public List<Premio> getAllPremios() {
        return premioRepository.findAll();
    }

    /**
     * GET /api/premios/{id}
     * Recupera un premio por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Premio> getPremioById(@PathVariable Long id) {
        Optional<Premio> resultado = premioRepository.findById(id);
        return resultado
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * POST /api/premios
     * Crea un nuevo premio. El JSON que envíe el frontend debe mapearse a la entidad Premio.
     */
    @PostMapping
    public ResponseEntity<Premio> createPremio(@RequestBody Premio nuevoPremio) {
        // Convierte fecha si viniera como String, o asume que Jackson ya la parsea a LocalDate.
        // Aquí asumimos que el JSON incluye "fecha": "2025-05-31".
        Premio guardado = premioRepository.save(nuevoPremio);
        return ResponseEntity
                .created(URI.create("/api/premios/" + guardado.getId()))
                .body(guardado);
    }

    /**
     * PUT /api/premios/{id}
     * Actualiza un premio existente. Si no existe, responde 404.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Premio> updatePremio(
            @PathVariable Long id,
            @RequestBody Premio datosActualizados
    ) {
        return premioRepository.findById(id)
                .map(premioExistente -> {
                    // Actualizar todos los campos relevantes
                    premioExistente.setArea(datosActualizados.getArea()); // Obligatorio
                    premioExistente.setAutores(datosActualizados.getAutores()); // Obligatorio
                    premioExistente.setTituloResultado(datosActualizados.getTituloResultado()); // Obligatorio
                    premioExistente.setTipo(datosActualizados.getTipo()); // Obligatorio
                    premioExistente.setDetalles(datosActualizados.getDetalles()); // Obligatorio
                    premioExistente.setFecha(datosActualizados.getFecha()); // Obligatorio
                    premioExistente.setProyecto(datosActualizados.getProyecto()); // Obligatorio
                    premioExistente.setFechaRegistro(datosActualizados.getFechaRegistro());
                    premioExistente.setUltimaActualizacion(datosActualizados.getUltimaActualizacion());
                    premioExistente.setCategoria(datosActualizados.getCategoria());
                    premioExistente.setConcurso(datosActualizados.getConcurso());
                    premioExistente.setOtrosNacionales(datosActualizados.getOtrosNacionales());
                    premioExistente.setPremioacc(datosActualizados.getPremioacc());
                    premioExistente.setEjecutor(datosActualizados.getEjecutor());
                    premioExistente.setParticipante(datosActualizados.getParticipante());
                    premioExistente.setProvincia(datosActualizados.getProvincia());
                    premioExistente.setTipoResultado(datosActualizados.getTipoResultado());
                    

                    Premio actualizado = premioRepository.save(premioExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/premios/{id}
     * Elimina un premio por su ID. Si no existe, responde 404.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePremio(@PathVariable Long id) {
        if (!premioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        premioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/premios/searchByTitulo?titulo=texto
     * Busca premios cuyo tituloResultado contenga la cadena "titulo" (ignora mayúsculas/minúsculas).
     */
    @GetMapping("/searchByTitulo")
    public List<Premio> searchByTitulo(@RequestParam("titulo") String titulo) {
        return premioRepository.findByTituloResultadoContainingIgnoreCase(titulo);
    }

    /**
     * GET /api/premios/searchByArea?area=texto
     * Busca premios cuyo campo area contenga la cadena "area" (ignora mayúsculas/minúsculas).
     */
    @GetMapping("/searchByArea")
    public List<Premio> searchByArea(@RequestParam("area") String area) {
        return premioRepository.findByAreaContainingIgnoreCase(area);
    }
}
