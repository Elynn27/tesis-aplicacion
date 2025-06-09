// src/main/java/com/example/demo/repository/IndicadorMetaRepository.java
package com.example.demo.repository;

import com.example.demo.model.IndicadorMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IndicadorMetaRepository extends JpaRepository<IndicadorMeta, Long> {
    Optional<IndicadorMeta> findByOe(String oe);
}
