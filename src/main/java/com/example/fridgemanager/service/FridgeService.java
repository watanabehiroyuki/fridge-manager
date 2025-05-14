package com.example.fridgemanager.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.repository.FridgeRepository;
import com.example.fridgemanager.repository.UserRepository;

@Service
public class FridgeService {

    private final FridgeRepository fridgeRepository;
    private final UserRepository userRepository;

    @Autowired
    public FridgeService(FridgeRepository fridgeRepository, UserRepository userRepository) {
        this.fridgeRepository = fridgeRepository;
        this.userRepository = userRepository;
    }
    // 新規冷蔵庫を追加
    public Fridge createFridge(Fridge fridge, User user) {
    	// Frigeにユーザーを追加
        fridge.getUsers().add(user);
        // userにFrigeを追加
        user.getFridges().add(fridge);
        return fridgeRepository.save(fridge);
    }
    
    // ユーザーと関係する冷蔵庫を返す
    //public List<Fridge> getFridgesByUser(User user) {
    //    return fridgeRepository.findByUsers(user);
    //}
    
    // メールから関係する冷蔵庫を返す
    public List<Fridge> getFridgesByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("ユーザーが見つかりません: " + email);
        }
        return new ArrayList<>(user.getFridges()); // Set → List に変換
    }
    
    // 冷蔵庫を削除する
    public void deleteFridge(Long fridgeId) {
        fridgeRepository.deleteById(fridgeId);
    }
    
    
    // 特定の冷蔵庫をIDで取得（見つからなければエラー）
    public Fridge getFridgeById(Long id) {
        return fridgeRepository.findById(id).orElseThrow(() -> new RuntimeException("Fridge not found"));
    }
    
    // 冷蔵庫を共有したいユーザを追加する
    public Fridge addUserToFridge(Long fridgeId, String email) {
    	// 冷蔵庫がなければエラーを返す
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new RuntimeException("Fridge not found"));
        // ユーザがいないければエラーを返す
        User userToAdd = userRepository.findByEmail(email);
        if (userToAdd == null) {
            throw new RuntimeException("User not found");
        }

        // すでに追加済みでなければ追加
        if (!fridge.getUsers().contains(userToAdd)) {
            fridge.getUsers().add(userToAdd);
            fridgeRepository.save(fridge);
        }

        return fridge;
    }
    
    // 冷蔵庫に関係するユーザ一覧を取得する
    public List<User> getUsersByFridgeId(Long fridgeId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new RuntimeException("Fridge not found"));
        return fridge.getUsers();
    }

    // 共有したユーザの削除
    public void removeUserFromFridge(Long fridgeId, Long userId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new RuntimeException("Fridge not found"));

        User userToRemove = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        // 冷蔵庫に登録されている特定のユーザを削除する
        fridge.getUsers().remove(userToRemove);
        fridgeRepository.save(fridge); 
    }


}
