package com.example.fridgemanager.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.repository.UserRepository;
import com.example.fridgemanager.service.FridgeService;

@RestController
@RequestMapping("/api/fridges")
@CrossOrigin
public class FridgeController {

    private final FridgeService fridgeService;
    private final UserRepository userRepository;

    @Autowired
    public FridgeController(FridgeService fridgeService, UserRepository userRepository) {
        this.fridgeService = fridgeService;
        this.userRepository = userRepository;
    }

    // 冷蔵庫の作成
    @PostMapping
    public Fridge createFridge(@RequestBody Fridge fridge, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return fridgeService.createFridge(fridge, user);
    }

    // ログインユーザーが属する冷蔵庫一覧を取得
    @GetMapping
    public List<Fridge> getMyFridges(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return fridgeService.getFridgesByUser(user);
    }

    // 単体取得（必要に応じて）
    @GetMapping("/{id}")
    public Fridge getFridge(@PathVariable Long id) {
        return fridgeService.getFridgeById(id);
    }
}
