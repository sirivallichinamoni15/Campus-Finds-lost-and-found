package com.example.lostfound.controller;

import com.example.lostfound.entity.FoundItem;
import com.example.lostfound.service.FoundItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FoundItemController {

    private final FoundItemService foundItemService;

    public FoundItemController(FoundItemService foundItemService) {
        this.foundItemService = foundItemService;
    }

    // Add Found Item
    @PostMapping("/found-items")
    public ResponseEntity<FoundItem> addFoundItem(@RequestBody FoundItem foundItem) {
        return ResponseEntity.ok(foundItemService.addFoundItem(foundItem));
    }

    // Get All Found Items
    @GetMapping("/found-items")
    public ResponseEntity<List<FoundItem>> getAllFoundItems() {
        return ResponseEntity.ok(foundItemService.getAllFoundItems());
    }

    // Search Found Items
    @GetMapping("/found-items/search")
    public ResponseEntity<List<FoundItem>> searchFoundItems(
            @RequestParam String itemName) {

        return ResponseEntity.ok(
                foundItemService.searchFoundItems(itemName)
        );
    }
}