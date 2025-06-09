package com.example.demo.repository;



import com.example.demo.model.Transferencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferenciaRepository extends JpaRepository<Transferencia, Long> {
    // Consultas personalizadas si son necesarias
}