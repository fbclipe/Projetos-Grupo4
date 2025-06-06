package com.cesarschool.projetos4.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.cesarschool.projetos4.entity.User;
import com.cesarschool.projetos4.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserbyUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User cadastrarUsuario(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado!");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username já cadastrado!");
        }

        return userRepository.save(user);
    }

    public User login(User user) {
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        if(!userOptional.isPresent()){
            throw new RuntimeException("usuario não encontrado");
        }else if(userOptional.get().getPassword().equals(user.getPassword()) && userOptional.get().getUsername().equals(user.getUsername())){
            return userRepository.save(userOptional.get());
        }
        throw new RuntimeException("nome ou senha incorretos");
    }
}