package com.example.lostfound.controller;

import com.example.lostfound.service.ItemMatchingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ItemMatchingController {

    private final ItemMatchingService itemMatchingService;

    public ItemMatchingController(
            ItemMatchingService itemMatchingService) {
        this.itemMatchingService = itemMatchingService;
    }

    @GetMapping("/matches")
    public ResponseEntity<List<Map<String, Object>>> getMatches() {

        return ResponseEntity.ok(
                itemMatchingService.findMatches()
        );
    }
}