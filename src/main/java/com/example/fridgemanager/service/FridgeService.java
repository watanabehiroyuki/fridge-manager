package com.example.fridgemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.repository.FridgeRepository;

@Service
public class FridgeService {

    private final FridgeRepository fridgeRepository;

    @Autowired
    public FridgeService(FridgeRepository fridgeRepository) {
        this.fridgeRepository = fridgeRepository;
    }

    public Fridge createFridge(Fridge fridge, User user) {
    	// Frigeにユーザーを追加
        fridge.getUsers().add(user);
        // userにFrigeを追加
        user.getFridges().add(fridge);
        return fridgeRepository.save(fridge);
    }
    // ユーザーと関係する冷蔵庫を返す
    public List<Fridge> getFridgesByUser(User user) {
        return fridgeRepository.findByUsers(user);
    }
    // 特定の冷蔵庫をIDで取得（見つからなければエラー）
    public Fridge getFridgeById(Long id) {
        return fridgeRepository.findById(id).orElseThrow(() -> new RuntimeException("Fridge not found"));
    }
}
