package com.example.demo.controller;

import com.example.demo.model.Experto;

import com.example.demo.repository.ExpertoRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expertos")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpertoController {

    private final ExpertoRepository repository;

    public ExpertoController(ExpertoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Experto> getAllExpertos() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Experto createExperto(@Valid @RequestBody Experto experto) {
        return repository.save(experto);
    }
    @PutMapping("/{id}")
  public Experto update(@PathVariable Long id, @Valid @RequestBody Experto experto) {
    experto.setId(id);
    return repository.save(experto);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    repository.deleteById(id);
  }

    
}