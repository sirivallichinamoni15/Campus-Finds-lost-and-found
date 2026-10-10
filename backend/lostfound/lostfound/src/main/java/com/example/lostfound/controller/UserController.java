package com.example.lostfound.controller;

import com.example.lostfound.entity.User;
import com.example.lostfound.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        User registeredUser = userService.registerUser(user);

        if (registeredUser == null) {
            return ResponseEntity.badRequest()
                    .body("Email already registered");
        }

        return ResponseEntity.ok(registeredUser);
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        String token =
                userService.loginUser(
                        user.getEmail(),
                        user.getPassword()
                );

        if (token == null) {
            return ResponseEntity.badRequest()
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(token);
    }
}