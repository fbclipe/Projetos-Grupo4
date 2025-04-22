package com.cesarschool.projetos4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cesarschool.projetos4.entity.User;
import com.cesarschool.projetos4.service.UserService;
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody User user) {
        try {
            User novoUsuario = userService.cadastrarUsuario(user);
            return ResponseEntity.ok(novoUsuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody User user) {
        try {
            User login = userService.login(user);
            return ResponseEntity.ok(login);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
