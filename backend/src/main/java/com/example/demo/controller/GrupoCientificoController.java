package com.example.demo.controller;

import com.example.demo.model.GrupoCientifico;
import com.example.demo.repository.GrupoCientificoRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grupos-cientificos")
@CrossOrigin(origins = "http://localhost:4200")
public class GrupoCientificoController {

    private final GrupoCientificoRepository repository;

    public GrupoCientificoController(GrupoCientificoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<GrupoCientifico> getAllGrupos() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GrupoCientifico createGrupo(@Valid @RequestBody GrupoCientifico grupo) {
        return repository.save(grupo);
    }

    @GetMapping("/{id}")
public ResponseEntity<GrupoCientifico> getGrupoById(@PathVariable Long id) {
    return repository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}")
public ResponseEntity<GrupoCientifico> updateGrupo(
    @PathVariable Long id, 
    @Valid @RequestBody GrupoCientifico grupoActualizado) {
    
    return repository.findById(id)
        .map(existente -> {
            existente.setFacultad(grupoActualizado.getFacultad());
            existente.setNombre(grupoActualizado.getNombre());
            existente.setAnio(grupoActualizado.getAnio());
            existente.setCarrera(grupoActualizado.getCarrera());
            existente.setEstudiantes(grupoActualizado.getEstudiantes());
            return ResponseEntity.ok(repository.save(existente));
        })
        .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteGrupo(@PathVariable Long id) {
    return repository.findById(id)
        .map(grupo -> {
            repository.delete(grupo);
            return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
}
}