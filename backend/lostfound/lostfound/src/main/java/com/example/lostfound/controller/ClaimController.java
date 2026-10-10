package com.example.lostfound.controller;

import com.example.lostfound.entity.Claim;
import com.example.lostfound.entity.User;
import com.example.lostfound.repository.UserRepository;
import com.example.lostfound.service.ClaimService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    private final ClaimService claimService;
    private final UserRepository userRepository;

    public ClaimController(
            ClaimService claimService,
            UserRepository userRepository) {

        this.claimService = claimService;
        this.userRepository = userRepository;
    }

    // Create Claim
    @PostMapping("/claims")
    public ResponseEntity<?> createClaim(
            @RequestBody Claim claim,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("User not found");
        }

        claim.setUserId(user.getId());

        return ResponseEntity.ok(
                claimService.createClaim(claim)
        );
    }

    // Get claims of logged-in user
    @GetMapping("/claims/my")
    public ResponseEntity<?> getMyClaims(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("User not found");
        }

        return ResponseEntity.ok(
                claimService.getClaimsByUserId(user.getId())
        );
    }
}
