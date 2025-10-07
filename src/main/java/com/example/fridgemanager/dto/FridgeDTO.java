package com.example.fridgemanager.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.entity.UserFridge;

/**
 * FridgeDTO
 * - 冷蔵庫の基本情報（ID・名前）と、関連するユーザー一覧をフロントに返すためのDTO
 * - フロントエンドで冷蔵庫の一覧や共有ユーザーを表示する際に使用
 */
public class FridgeDTO {
    // 冷蔵庫ID
    private Long id;
    // 冷蔵庫名
    private String name;
    // この冷蔵庫に紐づくユーザー情報（UserResponseDTO形式）
    private List<UserResponseDTO> users = new ArrayList<>();

    /**
     * エンティティFridgeからDTOを生成するコンストラクタ
     * - 関連するUserFridgeを通じてユーザー情報を取得し、DTOに詰める
     */
    public FridgeDTO(Fridge fridge) {
        this.id = fridge.getId();
        this.name = fridge.getName();
        if (fridge.getUserFridges() != null) {
            for (UserFridge uf : fridge.getUserFridges()) {
            	User user = uf.getUser();
                users.add(new UserResponseDTO(
                		user.getId(), 
                		user.getUsername(), 
                		user.getEmail(),
                		uf.getRole()
                	));
            }
        }
    }

    /**
     * IDと名前だけを指定する簡易コンストラクタ
     * - ユーザー情報は含まない（一覧表示用など）
     */
    public FridgeDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
        
        
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UserResponseDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserResponseDTO> users) {
        this.users = users;
    }
}
