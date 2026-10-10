package com.example.lostfound.controller;

import com.example.lostfound.entity.LostItem;
import com.example.lostfound.service.LostItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LostItemController {

    private final LostItemService lostItemService;

    public LostItemController(LostItemService lostItemService) {
        this.lostItemService = lostItemService;
    }

    // Add Lost Item
    @PostMapping("/lost-items")
    public ResponseEntity<LostItem> addLostItem(@RequestBody LostItem lostItem) {
        return ResponseEntity.ok(lostItemService.addLostItem(lostItem));
    }

    // Get All Lost Items
    @GetMapping("/lost-items")
    public ResponseEntity<List<LostItem>> getAllLostItems() {
        return ResponseEntity.ok(lostItemService.getAllLostItems());
    }

    // Search Lost Items
    @GetMapping("/lost-items/search")
    public ResponseEntity<List<LostItem>> searchLostItems(
            @RequestParam String itemName) {

        return ResponseEntity.ok(
                lostItemService.searchLostItems(itemName)
        );
    }
}