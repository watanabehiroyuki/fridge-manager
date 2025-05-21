package com.example.fridgemanager.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.dto.ShareRequest;
import com.example.fridgemanager.dto.UserResponseDTO;
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
        if (fridge.getUsers() == null ) {
            fridge.setUsers(new ArrayList<>());
        }
        User user = userRepository.findByEmail(principal.getName());
        return fridgeService.createFridge(fridge, user);
    }

    // ログインユーザーが属する冷蔵庫一覧を取得
    //@GetMapping
    //public List<Fridge> getMyFridges(Principal principal) {
    //    User user = userRepository.findByEmail(principal.getName());
    //    return fridgeService.getFridgesByUser(user);
    //}
    
    // ログインユーザーのメールアドレス取得
    @GetMapping
    public List<Fridge> getUserFridges(Principal principal) {
        String email = principal.getName();
        return fridgeService.getFridgesByUserEmail(email);
    }


    // 単体取得（必要に応じて）
    @GetMapping("/{id}")
    public Fridge getFridge(@PathVariable Long id) {
        return fridgeService.getFridgeById(id);
    }
    
    // シェアしたい冷蔵庫とユーザのメールを取得
    @PostMapping("/{fridgeId}/share")
    public Fridge shareFridge(@PathVariable Long fridgeId, @RequestBody ShareRequest request) {
        return fridgeService.addUserToFridge(fridgeId, request.getEmail());
    }
    
    // 冷蔵庫に関連するユーザを取得
    @GetMapping("/{fridgeId}/users")
    public List<UserResponseDTO> getFridgeUsers(@PathVariable Long fridgeId) {
        List<User> users = fridgeService.getUsersByFridgeId(fridgeId);
        List<UserResponseDTO> response = new ArrayList<>();

        for (User user : users) {
            response.add(new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail()));
        }

        return response;
    }

    // 冷蔵庫の共有からユーザを削除する
    @DeleteMapping("/{fridgeId}/users/{userId}")
    public void removeFridgeUser(@PathVariable Long fridgeId, @PathVariable Long userId) {
        fridgeService.removeUserFromFridge(fridgeId, userId);
    }
    
    // 冷蔵庫自体を削除する
    @DeleteMapping("/{fridgeId}")
    public void deleteFridge(@PathVariable Long fridgeId) {
        fridgeService.deleteFridge(fridgeId);
    }
    
}
