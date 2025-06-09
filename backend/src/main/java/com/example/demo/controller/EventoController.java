package com.example.demo.controller;

import com.example.demo.model.Evento;
import com.example.demo.repository.EventoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:4200")
public class EventoController {

  @Autowired
  private EventoRepository repo;

 
  @GetMapping
   public List<Evento> getAll() {
    return repo.findAll();
  }

  @GetMapping("/{id}")
  public Evento getOne(@PathVariable Long id) {
    return repo.findById(id)
               .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
  }

  @PostMapping
  public Evento create( @Valid @RequestBody Evento evento) {
    return repo.save(evento);
  }

  @PutMapping("/{id}")
  public Evento update(@PathVariable Long id, @Valid @RequestBody Evento evento) {
    evento.setId(id);
    return repo.save(evento);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    repo.deleteById(id);
  }
}