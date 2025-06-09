package  com.example.demo.controller;

import com.example.demo.repository.*;
import  com.example.demo.model.Transferencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/transferencias")
public class TransferenciaController {

    private final TransferenciaRepository transferenciaRepository;

    @Autowired
    public TransferenciaController(TransferenciaRepository transferenciaRepository) {
        this.transferenciaRepository = transferenciaRepository;
    }

    // Obtener todas las transferencias
    @GetMapping
    public ResponseEntity<List<Transferencia>> getAllTransferencias() {
        List<Transferencia> transferencias = transferenciaRepository.findAll();
        return new ResponseEntity<>(transferencias, HttpStatus.OK);
    }

    // Obtener una transferencia por ID
    @GetMapping("/{id}")
    public ResponseEntity<Transferencia> getTransferenciaById(@PathVariable Long id) {
        Optional<Transferencia> transferencia = transferenciaRepository.findById(id);
        return transferencia.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear una nueva transferencia
    @PostMapping
    public ResponseEntity<Transferencia> createTransferencia(@RequestBody Transferencia transferencia) {
        Transferencia nuevaTransferencia = transferenciaRepository.save(transferencia);
        return new ResponseEntity<>(nuevaTransferencia, HttpStatus.CREATED);
    }

    // Actualizar una transferencia existente
    @PutMapping("/{id}")
    public ResponseEntity<Transferencia> updateTransferencia(@PathVariable Long id, @RequestBody Transferencia transferenciaDetails) {
        return transferenciaRepository.findById(id)
                .map(transferencia -> {
                    transferencia.setArea(transferenciaDetails.getArea());
                    transferencia.setNumero(transferenciaDetails.getNumero());
                    transferencia.setTecnologia(transferenciaDetails.getTecnologia());
                    transferencia.setValorTotal(transferenciaDetails.getValorTotal());
                    transferencia.setEquipamiento(transferenciaDetails.getEquipamiento());
                    transferencia.setAsistenciaTecnica(transferenciaDetails.getAsistenciaTecnica());
                    transferencia.setPropiedadIntelectual(transferenciaDetails.getPropiedadIntelectual());
                    transferencia.setFormacionEntrenamiento(transferenciaDetails.getFormacionEntrenamiento());
                    transferencia.setOtros(transferenciaDetails.getOtros());
                    transferencia.setDescripcion(transferenciaDetails.getDescripcion());
                    transferencia.setSectorEstrategico(transferenciaDetails.getSectorEstrategico());
                    
                    Transferencia updatedTransferencia = transferenciaRepository.save(transferencia);
                    return new ResponseEntity<>(updatedTransferencia, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Eliminar una transferencia
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTransferencia(@PathVariable Long id) {
        try {
            transferenciaRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}