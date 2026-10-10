package com.example.lostfound.repository;

import com.example.lostfound.entity.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LostItemRepository extends JpaRepository<LostItem, Long> {

    List<LostItem> findByItemNameContainingIgnoreCase(String itemName);
}