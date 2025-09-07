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
import com.example.fridgemanager.entity.Role;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.entity.UserFridge;
import com.example.fridgemanager.exception.FridgeNotFoundException;
import com.example.fridgemanager.exception.UserNotFoundException;
import com.example.fridgemanager.repository.FridgeRepository;
import com.example.fridgemanager.repository.UserFridgeRepository;
import com.example.fridgemanager.repository.UserRepository;


@Service
public class FridgeService {

    private final FridgeRepository fridgeRepository;
    private final UserFridgeRepository userFridgeRepository;
    private final UserRepository userRepository;

    @Autowired
    public FridgeService(FridgeRepository fridgeRepository, UserFridgeRepository userFridgeRepository, UserRepository userRepository) {
        this.fridgeRepository = fridgeRepository;
        this.userFridgeRepository = userFridgeRepository;
        this.userRepository = userRepository;
    }
    // 新規冷蔵庫を追加（作成者をOWNERとして登録）
    public Fridge createFridge(User user, String fridgeName) {
        // 冷蔵庫を作成
        Fridge fridge = new Fridge();
        fridge.setName(fridgeName);
        fridge = fridgeRepository.save(fridge);
        // UserFridge（中間テーブル）に登録
        UserFridge userFridge = new UserFridge();
        userFridge.setUser(user);
        userFridge.setFridge(fridge);
        userFridge.setRole(Role.OWNER);

        userFridgeRepository.save(userFridge);

        return fridge;
    }
    
    // ユーザーのメールアドレスから冷蔵庫一覧を取得
    public List<Fridge> getFridgesByUserEmail(String email) {
    	User user = userRepository.findByEmailWithFridges(email);
        if (user == null) {
            throw new UserNotFoundException("User not found: " + email);
        }
        List<Fridge> fridges = new ArrayList<>();
        for (UserFridge uf : user.getUserFridges()) {
            fridges.add(uf.getFridge());
        }
        return fridges;
    }
    
    // 冷蔵庫を削除（オーナーでなければエラー）
    public void deleteFridge(Long fridgeId, User requestingUser) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
                .orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + fridgeId));
        // オーナー権限があるか確認
        boolean isOwner = false;
        for (UserFridge uf : fridge.getUserFridges()) {
            if (uf.getUser().getId().equals(requestingUser.getId()) && uf.getRole() == Role.OWNER) {
                isOwner = true;
                break;
            }
        }
        
        if (!isOwner) {
            throw new RuntimeException("オーナーのみがこの冷蔵庫を削除できます");
        }
        
        fridgeRepository.deleteById(fridgeId);
    }
    
    
    // IDで冷蔵庫を取得（存在しなければ例外）
    public Fridge getFridgeById(Long id) {
        return fridgeRepository.findById(id).orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + id));
    }
    
    // ユーザーを冷蔵庫の共有メンバーとして追加
    public Fridge addUserToFridge(Long fridgeId, String email) {
    	// 冷蔵庫がなければエラーを返す
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + fridgeId));
        // ユーザがいないければエラーを返す
        User userToAdd = userRepository.findByEmail(email);
        if (userToAdd == null) {
            throw new UserNotFoundException("User not found: " + email);
        }

        // すでにそのユーザーが登録されていないか確認
        boolean alreadyExists = userFridgeRepository.findByUserIdAndFridgeId(userToAdd.getId(), fridgeId).isPresent();
        // すでに追加済みなら何もしない
        if (alreadyExists) {
            return fridge; 
        }

        // 中間エンティティを作成して保存
        UserFridge userFridge = new UserFridge();
        userFridge.setUser(userToAdd);
        userFridge.setFridge(fridge);
        userFridge.setRole(Role.MEMBER);

        userFridgeRepository.save(userFridge);
        
        return fridge;
    }
    
    // 冷蔵庫に紐づくユーザー一覧を取得
    public List<User> getUsersByFridgeId(Long fridgeId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + fridgeId));
        List<User> users = new ArrayList<>();
        for (UserFridge uf : fridge.getUserFridges()) {
            users.add(uf.getUser());
        }
        return users;
    }

    // 冷蔵庫の共有メンバーを削除（オーナーが1人しかいない場合は削除不可）
    public void removeUserFromFridge(Long fridgeId, Long userId) {
        UserFridge userFridge = userFridgeRepository.findByUserIdAndFridgeId(userId, fridgeId)
                .orElseThrow(() -> new IllegalArgumentException("指定されたユーザーと冷蔵庫の関係が見つかりません"));

            if (userFridge.getRole() == Role.OWNER) {
                int ownerCount = userFridgeRepository.countByFridgeIdAndRole(fridgeId, Role.OWNER);
                if (ownerCount <= 1) {
                    throw new IllegalStateException("この冷蔵庫にはオーナーが1人しかいないため、削除できません。");
                }
            }

            userFridgeRepository.delete(userFridge);
    }
    
    // 指定メールアドレスのユーザーに関連する冷蔵庫・食材・ユーザーをまとめて取得
    public List<FridgeDetailDTO> getFridgeDetailsByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
        	throw new UserNotFoundException("User not found: " + email);
        }

        List<Fridge> fridges = new ArrayList<>();
        for (UserFridge uf : user.getUserFridges()) {
            fridges.add(uf.getFridge());
        }

        List<FridgeDetailDTO> result = new ArrayList<>();
        
        for (Fridge fridge : fridges) {
            // 食材リストの変換
            List<FridgeItemDTO> itemDTOs = new ArrayList<>();
            for (FridgeItem item : fridge.getFridgeItems()) {
            	FridgeItemDTO itemDTO = new FridgeItemDTO(
            		item.getId(),
                    item.getName(),
                    item.getCategory(),
                    item.getQuantity(),
                    item.getExpirationDate()
                 );
                itemDTOs.add(itemDTO);
            }

            // 共有ユーザーリストの変換
            List<UserSimpleDTO> userDTOs = new ArrayList<>();
            for (UserFridge uf : fridge.getUserFridges()) {
            	User users = uf.getUser();
                UserSimpleDTO userDTO = new UserSimpleDTO(
                    users.getId(),
                    users.getUsername(),
                    uf.getRole()
                );
                userDTOs.add(userDTO);
            }

            // 冷蔵庫の情報を1つのDTOにまとめる
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
