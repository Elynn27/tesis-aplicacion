package com.example.demo.controller;

import com.example.demo.model.IndicadorCTI;
import com.example.demo.repository.IndicadorRepository;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/indicadores")
@CrossOrigin(origins = "http://localhost:4200")

public class IndicadorCTIController {

    private final IndicadorRepository repository;

    public IndicadorCTIController(IndicadorRepository repository) {
        this.repository = repository;
    }

    /** GET /api/indicadores → Lista todas las indicadores */
    @GetMapping
    public List<IndicadorCTI> getAllIndicadores() {
        return repository.findAll();
    }

    /** GET /api/indicadores/{id} → Obtiene una indicador por ID */
    @GetMapping("/{id}")
    public ResponseEntity<IndicadorCTI> getIndicadorById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
   
   @PostMapping
   public IndicadorCTI create(@Valid @RequestBody IndicadorCTI indicador) {
       return repository.save(indicador);
   }

   @PutMapping("/{id}")
public ResponseEntity<IndicadorCTI> actualizarMeta(
    @PathVariable Long id, // <-- Debe ser Long
    @RequestBody IndicadorCTI updatedIndicador) { // <-- Recibir objeto completo
    
    return repository.findById(id).map(existente -> {
        existente.setMeta(updatedIndicador.getMeta());
        existente.setReal(updatedIndicador.getReal());
        existente.setPorcentajeCumplimiento(updatedIndicador.getPorcentajeCumplimiento());
        return ResponseEntity.ok(repository.save(existente));
    }).orElse(ResponseEntity.notFound().build());
}
    /** DELETE /api/indicadores/{id} → Elimina una indicador por ID */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIndicador(@PathVariable Long id) {
        return repository.findById(id).map(indicador -> {
            repository.delete(indicador);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }

}

