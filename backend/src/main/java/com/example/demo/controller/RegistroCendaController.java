package com.example.demo.controller;

import com.example.demo.model.RegistroCenda;
import com.example.demo.repository.RegistroCendaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registros-cenda")
@CrossOrigin(origins = "http://localhost:4200")
public class RegistroCendaController {

    private final RegistroCendaRepository repository;

    public RegistroCendaController(RegistroCendaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<RegistroCenda> getAllRegistros() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RegistroCenda createRegistro(@Valid @RequestBody RegistroCenda registro) {
        return repository.save(registro);
    }
    @GetMapping("/{id}")
public ResponseEntity<RegistroCenda> getRegistroById(@PathVariable Long id) {
    return repository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}")
public ResponseEntity<RegistroCenda> updateRegistro(
    @PathVariable Long id,
    @Valid @RequestBody RegistroCenda registroActualizado) {
    
    return repository.findById(id)
        .map(existente -> {
            existente.setArea(registroActualizado.getArea());
            existente.setAutores(registroActualizado.getAutores());
            // Actualizar todos los campos
            return ResponseEntity.ok(repository.save(existente));
        })
        .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteRegistro(@PathVariable Long id) {
    return repository.findById(id)
        .map(registro -> {
            repository.delete(registro);
            return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
}
}