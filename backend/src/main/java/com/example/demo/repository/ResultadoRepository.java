package com.example.demo.repository;

import com.example.demo.model.Resultado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultadoRepository extends JpaRepository<Resultado, Long> {
    // Consultas personalizadas si son necesarias
}