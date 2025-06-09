package com.example.demo.repository;

import com.example.demo.model.GrupoCientifico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrupoCientificoRepository extends JpaRepository<GrupoCientifico, Long> {
}