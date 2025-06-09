package com.example.demo.controller;

import com.example.demo.model.Publicacion;
import com.example.demo.repository.PublicacionRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publicaciones")
@CrossOrigin(origins = "http://localhost:4200")
public class PublicacionController {

    private final PublicacionRepository repository;

    public PublicacionController(PublicacionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Publicacion> getAllPublicaciones() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Publicacion createPublicacion(@Valid @RequestBody Publicacion publicacion) {
        return repository.save(publicacion);
    }

    @GetMapping("/{id}")
public ResponseEntity<Publicacion> getPublicacionById(@PathVariable Long id) {
    return repository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}")
public ResponseEntity<Publicacion> updatePublicacion(
    @PathVariable Long id, 
    @Valid @RequestBody Publicacion publicacionActualizada) {
    
    return repository.findById(id)
        .map(existente -> {
            existente.setArea(publicacionActualizada.getArea());
            existente.setTitulo(publicacionActualizada.getTitulo());
            // Actualizar todos los campos necesarios
            return ResponseEntity.ok(repository.save(existente));
        })
        .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deletePublicacion(@PathVariable Long id) {
    return repository.findById(id)
        .map(publicacion -> {
            repository.delete(publicacion);
            return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
}
}