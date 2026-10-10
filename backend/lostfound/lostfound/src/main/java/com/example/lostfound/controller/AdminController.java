package com.example.lostfound.controller;

import com.example.lostfound.entity.Claim;
import com.example.lostfound.entity.FoundItem;
import com.example.lostfound.entity.LostItem;
import com.example.lostfound.entity.User;

import com.example.lostfound.repository.ClaimRepository;
import com.example.lostfound.repository.FoundItemRepository;
import com.example.lostfound.repository.LostItemRepository;
import com.example.lostfound.repository.UserRepository;

import com.example.lostfound.service.ClaimService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;
    private final LostItemRepository lostItemRepository;
    private final FoundItemRepository foundItemRepository;
    private final ClaimRepository claimRepository;
    private final ClaimService claimService;

    public AdminController(
            UserRepository userRepository,
            LostItemRepository lostItemRepository,
            FoundItemRepository foundItemRepository,
            ClaimRepository claimRepository,
            ClaimService claimService) {

        this.userRepository = userRepository;
        this.lostItemRepository = lostItemRepository;
        this.foundItemRepository = foundItemRepository;
        this.claimRepository = claimRepository;
        this.claimService = claimService;
    }


    // =========================================
    // GET ALL USERS
    // =========================================

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userRepository.findAll()
        );
    }


    // =========================================
    // GET ALL LOST ITEMS
    // =========================================

    @GetMapping("/lost-items")
    public ResponseEntity<List<LostItem>> getAllLostItems() {

        return ResponseEntity.ok(
                lostItemRepository.findAll()
        );
    }


    // =========================================
    // GET ALL FOUND ITEMS
    // =========================================

    @GetMapping("/found-items")
    public ResponseEntity<List<FoundItem>> getAllFoundItems() {

        return ResponseEntity.ok(
                foundItemRepository.findAll()
        );
    }


    // =========================================
    // GET ALL CLAIMS
    // =========================================

    @GetMapping("/claims")
    public ResponseEntity<List<Claim>> getAllClaims() {

        return ResponseEntity.ok(
                claimRepository.findAll()
        );
    }


    // =========================================
    // APPROVE / REJECT CLAIM
    // =========================================

    @PutMapping("/claims/{id}/status")
    public ResponseEntity<?> updateClaimStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        if (!status.equalsIgnoreCase("APPROVED")
                && !status.equalsIgnoreCase("REJECTED")) {

            return ResponseEntity.badRequest()
                    .body(
                            "Status must be APPROVED or REJECTED"
                    );
        }

        Claim updatedClaim =
                claimService.updateClaimStatus(
                        id,
                        status.toUpperCase()
                );

        if (updatedClaim == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                updatedClaim
        );
    }


    // =========================================
    // DELETE USER
    // =========================================

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {

        if (!userRepository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        userRepository.deleteById(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }


    // =========================================
    // DELETE LOST ITEM
    // =========================================

    @DeleteMapping("/lost-items/{id}")
    public ResponseEntity<?> deleteLostItem(
            @PathVariable Long id) {

        if (!lostItemRepository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        lostItemRepository.deleteById(id);

        return ResponseEntity.ok(
                "Lost item deleted successfully"
        );
    }


    // =========================================
    // DELETE FOUND ITEM
    // =========================================

    @DeleteMapping("/found-items/{id}")
    public ResponseEntity<?> deleteFoundItem(
            @PathVariable Long id) {

        if (!foundItemRepository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        foundItemRepository.deleteById(id);

        return ResponseEntity.ok(
                "Found item deleted successfully"
        );
    }

}
