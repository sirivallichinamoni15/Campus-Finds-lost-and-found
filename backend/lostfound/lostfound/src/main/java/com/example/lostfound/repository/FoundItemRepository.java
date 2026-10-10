package com.example.lostfound.repository;

import com.example.lostfound.entity.FoundItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoundItemRepository extends JpaRepository<FoundItem, Long> {

    List<FoundItem> findByItemNameContainingIgnoreCase(String itemName);
}