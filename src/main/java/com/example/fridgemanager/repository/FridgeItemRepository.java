package com.example.fridgemanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fridgemanager.entity.FridgeItem;

@Repository
public interface FridgeItemRepository extends JpaRepository<FridgeItem, Long> {
    List<FridgeItem> findByNameContainingIgnoreCase(String name); // 部分一致検索用
}
