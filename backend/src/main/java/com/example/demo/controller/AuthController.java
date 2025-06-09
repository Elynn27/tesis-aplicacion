package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService svc;

    public AuthController(UsuarioService svc) {
        this.svc = svc;
    }

    // DTOs inline para simplicidad
    public static record RegisterReq(String correo, String nombre, String apellidos, String password) {}
    public static record LoginReq(String correo, String password) {}
    public static record LoginRes(Long id, String correo, String nombre, String apellidos) {}

    @PostMapping("/register")
    public LoginRes register(@RequestBody RegisterReq req) {
        Usuario u = svc.registrar(req.correo(), req.nombre(), req.apellidos(), req.password());
        return new LoginRes(u.getId(), u.getCorreo(), u.getNombre(), u.getApellidos());
    }

    @PostMapping("/login")
    public LoginRes login(@RequestBody LoginReq req) {
        Usuario u = svc.login(req.correo(), req.password());
        return new LoginRes(u.getId(), u.getCorreo(), u.getNombre(), u.getApellidos());
    }
}
