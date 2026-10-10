package com.example.lostfound.service;

import com.example.lostfound.entity.LostItem;
import com.example.lostfound.repository.LostItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LostItemService {

    private final LostItemRepository lostItemRepository;

    public LostItemService(LostItemRepository lostItemRepository) {
        this.lostItemRepository = lostItemRepository;
    }

    // Report Lost Item
    public LostItem addLostItem(LostItem lostItem) {
        return lostItemRepository.save(lostItem);
    }

    // Get All Lost Items
    public List<LostItem> getAllLostItems() {
        return lostItemRepository.findAll();
    }

    // Search Lost Items
    public List<LostItem> searchLostItems(String itemName) {
        return lostItemRepository.findByItemNameContainingIgnoreCase(itemName);
    }
}