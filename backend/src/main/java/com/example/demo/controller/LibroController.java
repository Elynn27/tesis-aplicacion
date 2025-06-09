package com.example.demo.controller;

import com.example.demo.model.Libro;
import com.example.demo.repository.LibroRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:4200")  // Ajusta al puerto de tu frontend
public class LibroController {

  @Autowired
  private LibroRepository repo;

  @GetMapping
  public List<Libro> getAll() {
    return repo.findAll();
  }

  @GetMapping("/{id}")
  public Libro getOne(@PathVariable Long id) {
    return repo.findById(id)
               .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
  }

  @PostMapping
  public Libro create( @Valid @RequestBody Libro libro) {
    return repo.save(libro);
  }

  @PutMapping("/{id}")
  public Libro update(@PathVariable Long id, @Valid @RequestBody Libro libro) {
    libro.setId(id);
    return repo.save(libro);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    repo.deleteById(id);
  }
}
