// src/main/java/com/ejemplo/premios/repository/PremioRepository.java
package com.example.demo.repository;

import com.example.demo.model.Premio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PremioRepository extends JpaRepository<Premio, Long> {
    // Buscar por tituloResultado (contenga, ignorando mayúsculas/minúsculas)
    List<Premio> findByTituloResultadoContainingIgnoreCase(String tituloResultado);

    // Buscar por area (contenga, ignorando mayúsculas/minúsculas)
    List<Premio> findByAreaContainingIgnoreCase(String area);
}
