package com.example.lostfound.service;

import com.example.lostfound.entity.FoundItem;
import com.example.lostfound.repository.FoundItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoundItemService {

    private final FoundItemRepository foundItemRepository;

    public FoundItemService(FoundItemRepository foundItemRepository) {
        this.foundItemRepository = foundItemRepository;
    }

    // Report Found Item
    public FoundItem addFoundItem(FoundItem foundItem) {
        return foundItemRepository.save(foundItem);
    }

    // Get All Found Items
    public List<FoundItem> getAllFoundItems() {
        return foundItemRepository.findAll();
    }

    // Search Found Items
    public List<FoundItem> searchFoundItems(String itemName) {
        return foundItemRepository.findByItemNameContainingIgnoreCase(itemName);
    }
}