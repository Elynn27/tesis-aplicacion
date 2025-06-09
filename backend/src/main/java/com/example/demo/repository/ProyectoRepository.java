package com.example.demo.repository;

import com.example.demo.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
     @Query("SELECT p FROM Proyecto p")
    Page<Proyecto> findAll(Pageable pageable);
}