package com.example.lostfound.service;

import com.example.lostfound.entity.User;
import com.example.lostfound.repository.UserRepository;
import com.example.lostfound.security.JwtService;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // Register User
    public User registerUser(User user) {

        User existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return null;
        }

        // Normal registration is always STUDENT
        user.setRole("STUDENT");

        return userRepository.save(user);
    }

    // Login User
    public String loginUser(
            String email,
            String password) {

        User user =
                userRepository.findByEmail(email);

        if (user != null &&
                user.getPassword().equals(password)) {

            // Generate token using user details
            return jwtService.generateToken(user);
        }

        return null;
    }
}

