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
        fridge.getUsers().add(user);
        user.getFridges().add(fridge); // 双方向の関連付け
        return fridgeRepository.save(fridge);
    }

    public List<Fridge> getFridgesByUser(User user) {
        return fridgeRepository.findByUsers(user);
    }

    public Fridge getFridgeById(Long id) {
        return fridgeRepository.findById(id).orElseThrow(() -> new RuntimeException("Fridge not found"));
    }
}
