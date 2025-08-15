package com.example.fridgemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fridgemanager.entity.Fridge;

public interface FridgeRepository extends JpaRepository<Fridge, Long> {
	// ユーザーが参加している冷蔵庫を取得
    //List<Fridge> findByUsers(User user); 
}
