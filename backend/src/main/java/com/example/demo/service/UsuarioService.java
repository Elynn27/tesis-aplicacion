package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public Usuario registrar(String correo, String nombre, String apellidos, String rawPassword) {
        if (repo.findByCorreo(correo).isPresent()) {
            throw new RuntimeException("Correo ya registrado");
        }
        Usuario u = new Usuario();
        u.setCorreo(correo);
        u.setNombre(nombre);
        u.setApellidos(apellidos);
        // **Hasheamos** la contraseña
        u.setPassword(encoder.encode(rawPassword));
        return repo.save(u);
    }

    public Usuario login(String correo, String rawPassword) {
        Usuario u = repo.findByCorreo(correo)
                        .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
        if (!encoder.matches(rawPassword, u.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }
        return u;
    }
}
