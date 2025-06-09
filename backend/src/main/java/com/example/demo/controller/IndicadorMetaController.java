// src/main/java/com/example/demo/controller/IndicadorMetaController.java
package com.example.demo.controller;

import com.example.demo.model.IndicadorMeta;
import com.example.demo.repository.IndicadorMetaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "http://localhost:4200")
public class IndicadorMetaController {

    private final IndicadorMetaRepository repository;

    public IndicadorMetaController(IndicadorMetaRepository repository) {
        this.repository = repository;
    }

    /** GET /api/metas → Lista todas las metas */
    @GetMapping
    public ResponseEntity<List<IndicadorMeta>> getAllMetas() {
        List<IndicadorMeta> metas = repository.findAll();
        return ResponseEntity.ok(metas);
    }

    /** GET /api/metas/{id} → Obtiene una meta por ID */
    @GetMapping("/{id}")
    public ResponseEntity<IndicadorMeta> getMetaById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** POST /api/metas → Crea una nueva meta */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public IndicadorMeta createMeta(@Valid @RequestBody IndicadorMeta meta) {
        meta.setId(null);
        return repository.save(meta);
    }

    /** PUT /api/metas/{id} → Actualiza una meta existente */
    @PutMapping("/{id}")
public ResponseEntity<IndicadorMeta> updateMeta(
        @PathVariable Long id,
        @Valid @RequestBody IndicadorMeta metaActualizado) {

    return repository.findById(id).map(existente -> {
        existente.setOe(metaActualizado.getOe());
        existente.setIndicador(metaActualizado.getIndicador());
        existente.setMeta_valor(metaActualizado.getMeta_valor()); // <-- cambia aquí
        return ResponseEntity.ok(repository.save(existente));
    }).orElse(ResponseEntity.notFound().build());
}

    /** DELETE /api/metas/{id} → Elimina una meta por ID */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeta(@PathVariable Long id) {
        return repository.findById(id).map(m -> {
            repository.delete(m);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
