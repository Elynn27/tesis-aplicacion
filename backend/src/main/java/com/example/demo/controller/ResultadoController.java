package com.example.demo.controller;



import com.example.demo.model.Resultado;
import com.example.demo.repository.ResultadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resultados-introducidos")
public class ResultadoController {

    private final ResultadoRepository resultadoRepository;

    @Autowired
    public ResultadoController(ResultadoRepository resultadoRepository) {
        this.resultadoRepository = resultadoRepository;
    }

    // Obtener todos los resultados
    @GetMapping
    public ResponseEntity<List<Resultado>> getAllResultados() {
        List<Resultado> resultados = resultadoRepository.findAll();
        return new ResponseEntity<>(resultados, HttpStatus.OK);
    }

    // Crear un nuevo resultado
    @PostMapping
    public ResponseEntity<Resultado> createResultado(@RequestBody Resultado resultado) {
        Resultado nuevoResultado = resultadoRepository.save(resultado);
        return new ResponseEntity<>(nuevoResultado, HttpStatus.CREATED);
    }

    // Obtener un resultado por ID
    @GetMapping("/{id}")
    public ResponseEntity<Resultado> getResultadoById(@PathVariable Long id) {
        Optional<Resultado> resultado = resultadoRepository.findById(id);
        return resultado.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Actualizar un resultado existente
    @PutMapping("/{id}")
    public ResponseEntity<Resultado> updateResultado(@PathVariable Long id, @RequestBody Resultado resultadoDetails) {
        return resultadoRepository.findById(id)
                .map(resultado -> {
                    resultado.setArea(resultadoDetails.getArea());
                    resultado.setResultado(resultadoDetails.getResultado());
                    resultado.setTipoImpacto(resultadoDetails.getTipoImpacto());
                    resultado.setValoracionCualitativa(resultadoDetails.getValoracionCualitativa());
                    resultado.setValor(resultadoDetails.getValor());
                    resultado.setSectoresEstrategicos(resultadoDetails.getSectoresEstrategicos());
                    
                    Resultado updatedResultado = resultadoRepository.save(resultado);
                    return new ResponseEntity<>(updatedResultado, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Eliminar un resultado
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteResultado(@PathVariable Long id) {
        try {
            resultadoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}