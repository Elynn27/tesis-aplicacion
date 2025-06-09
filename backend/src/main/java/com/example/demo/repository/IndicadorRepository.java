package com.example.demo.repository;

import com.example.demo.model.IndicadorCTI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicadorRepository extends JpaRepository<IndicadorCTI, Long> {
    // Si en el futuro necesitas búsquedas personalizadas, puedes agregar métodos aquí.
}
