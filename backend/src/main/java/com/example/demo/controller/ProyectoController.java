package com.example.demo.controller;

import com.example.demo.model.Proyecto;
import com.example.demo.repository.ProyectoRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProyectoController {

    private final ProyectoRepository repository;

    public ProyectoController(ProyectoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Page<Proyecto> getAllProyectos(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Proyecto createProyecto(@Valid @RequestBody Proyecto proyecto) {
        proyecto.setId(null);
        return repository.save(proyecto);
    }

    @GetMapping("/{id}")
public ResponseEntity<Proyecto> getProyectoById(@PathVariable Long id) {
    return repository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}")
public ResponseEntity<Proyecto> updateProyecto(
    @PathVariable Long id,
    @Valid @RequestBody Proyecto proyectoActualizado) {
    
    return repository.findById(id)
        .map(existente -> {
            existente.setTitulo(proyectoActualizado.getTitulo());
            existente.setDescripcion(proyectoActualizado.getDescripcion());
            // Actualizar todos los campos necesarios
            return ResponseEntity.ok(repository.save(existente));
        })
        .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteProyecto(@PathVariable Long id) {
    return repository.findById(id)
        .map(proyecto -> {
            repository.delete(proyecto);
            return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
}
}