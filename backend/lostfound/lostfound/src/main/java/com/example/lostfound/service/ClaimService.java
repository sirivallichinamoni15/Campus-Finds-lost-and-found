package com.example.lostfound.service;

import com.example.lostfound.entity.Claim;
import com.example.lostfound.repository.ClaimRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;

    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    // Create Claim
    public Claim createClaim(Claim claim) {

        if (claim.getStatus() == null || claim.getStatus().isEmpty()) {
            claim.setStatus("PENDING");
        }

        return claimRepository.save(claim);
    }

    // Get all claims
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    // Get claims of a specific user
    public List<Claim> getClaimsByUserId(Long userId) {
        return claimRepository.findByUserId(userId);
    }

    // Update claim status
    public Claim updateClaimStatus(Long id, String status) {

        Claim claim = claimRepository.findById(id).orElse(null);

        if (claim == null) {
            return null;
        }

        claim.setStatus(status);

        return claimRepository.save(claim);
    }
}
