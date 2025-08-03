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
    // 新規冷蔵庫を追加
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
        List<Fridge> fridges = new ArrayList<>();
        for (UserFridge uf : user.getUserFridges()) {
            fridges.add(uf.getFridge());
        }
        return fridges;
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
    
    // 冷蔵庫に関係するユーザ一覧を取得する
    public List<User> getUsersByFridgeId(Long fridgeId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
            .orElseThrow(() -> new FridgeNotFoundException("Fridge not found: id=" + fridgeId));
        List<User> users = new ArrayList<>();
        for (UserFridge uf : fridge.getUserFridges()) {
            users.add(uf.getUser());
        }
        return users;
    }

    // 共有したユーザの削除
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
    
    // メールから全ての冷蔵庫と全ての食材と全ての共有しているユーザを取得
    public List<FridgeDetailDTO> getFridgeDetailsByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
        	throw new UserNotFoundException("User not found: " + email);
        }

        // --- ① この人が使っている冷蔵庫のリストを取得
        List<Fridge> fridges = new ArrayList<>();
        for (UserFridge uf : user.getUserFridges()) {
            fridges.add(uf.getFridge());
        }
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
            for (UserFridge uf : fridge.getUserFridges()) {
            	User users = uf.getUser();
                UserSimpleDTO userDTO = new UserSimpleDTO(
                    users.getId(),
                    users.getUsername(),
                    uf.getRole()
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
