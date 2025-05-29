package com.example.fridgemanager.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.dto.FridgeDetailDTO;
import com.example.fridgemanager.dto.FridgeItemDTO;
import com.example.fridgemanager.dto.UserSimpleDTO;
import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.exception.FridgeNotFoundException;
import com.example.fridgemanager.exception.UserNotFoundException;
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
        user.getFridges().add(fridge);
        // userにFrigeを追加
        // user.getFridges().add(fridge);
        return fridgeRepository.save(fridge);
    }
    
    // ユーザーと関係する冷蔵庫を返す
    //public List<Fridge> getFridgesByUser(User user) {
    //    return fridgeRepository.findByUsers(user);
    //}
    
    // メールアドレスから、そのユーザーの冷蔵庫一覧を取得する（ユーザがみつからなければエラーを返す）
    public List<Fridge> getFridgesByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User not found: " + email);
        }
        return new ArrayList<>(user.getFridges()); 
    }
    
    // 冷蔵庫を削除する
    public void deleteFridge(Long fridgeId) {
        fridgeRepository.deleteById(fridgeId);
    }
    
    
    // 特定の冷蔵庫をIDで取得（見つからなければエラー）
    public Fridge getFridgeById(Long id) {
        return fridgeRepository.findById(id).orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + id));
    }
    
    // 冷蔵庫を共有したいユーザを追加する
    public Fridge addUserToFridge(Long fridgeId, String email) {
    	// 冷蔵庫がなければエラーを返す
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + fridgeId));
        // ユーザがいないければエラーを返す
        User userToAdd = userRepository.findByEmail(email);
        if (userToAdd == null) {
            throw new UserNotFoundException("User not found: " + email);
        }

        // すでに追加済みでなければ追加
        if (!fridge.getUsers().contains(userToAdd)) {
            fridge.getUsers().add(userToAdd);
            userToAdd.getFridges().add(fridge);
            fridgeRepository.save(fridge);
        }

        return fridge;
    }
    
    // 冷蔵庫に関係するユーザ一覧を取得する
    public List<User> getUsersByFridgeId(Long fridgeId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + fridgeId));
        return fridge.getUsers();
    }

    // 共有したユーザの削除
    public void removeUserFromFridge(Long fridgeId, Long userId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + fridgeId));

        User userToRemove = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("User not found" + userId
            		));
        // 冷蔵庫に登録されている特定のユーザを削除する
        fridge.getUsers().remove(userToRemove);
        fridgeRepository.save(fridge); 
    }
    
    // メールから全ての冷蔵庫と全ての食材と全ての共有しているユーザを取得
    public List<FridgeDetailDTO> getFridgeDetailsByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
        	throw new UserNotFoundException("User not found: " + email);
        }

        // --- ① この人が使っている冷蔵庫のリストを取得
        List<Fridge> fridges = user.getFridges();
        // --- 結果用のリストを作る
        List<FridgeDetailDTO> result = new ArrayList<>();
        
        // --- ② 冷蔵庫ごとに繰り返し
        for (Fridge fridge : fridges) {
        	 // --- この冷蔵庫の中の食材をリストに変換
            List<FridgeItemDTO> itemDTOs = new ArrayList<>();
            for (FridgeItem item : fridge.getFridgeItems()) {
            	// item = 冷蔵庫の中の1つの食材
            	FridgeItemDTO itemDTO = new FridgeItemDTO(
            		item.getId(),
                    item.getName(),
                    item.getCategory(),
                    item.getQuantity(),
                    item.getExpirationDate()
                 );
                itemDTOs.add(itemDTO);
            }

            // --- この冷蔵庫を一緒に使っている人のリストを作る
            List<UserSimpleDTO> userDTOs = new ArrayList<>();
            // u = 冷蔵庫を共有している1人のユーザー
            for (User u : fridge.getUsers()) {
                UserSimpleDTO userDTO = new UserSimpleDTO(
                    u.getId(),
                    u.getUsername()
                );
                userDTOs.add(userDTO);
            }

            // --- この冷蔵庫の情報を1つのDTOにまとめる
            FridgeDetailDTO fridgeDetail = new FridgeDetailDTO(
                fridge.getId(),
                fridge.getName(),
                itemDTOs,
                userDTOs
            );

            // この冷蔵庫の情報を結果リストに追加
            result.add(fridgeDetail);
        }

        return result;
    }



}
