package com.example.fridgemanager.dto;

import java.util.List;

/**
 * FridgeDetailDTO
 * - 冷蔵庫の詳細情報をフロントエンドに渡すためのDTO
 * - 冷蔵庫の基本情報（id, name）に加えて、
 *   食材リスト（items）や共有ユーザーリスト（users）を含む
 */
public class FridgeDetailDTO {
	// 冷蔵庫ID
    private Long id;
    // 冷蔵庫名
    private String name;
    // 冷蔵庫内の食材リスト
    private List<FridgeItemDTO> items;
    // 冷蔵庫を共有しているユーザー一覧
    private List<UserSimpleDTO> users;

    /**
     * コンストラクタ（食材とユーザーを含む）
     */
    public FridgeDetailDTO(Long id, String name, List<FridgeItemDTO> items, List<UserSimpleDTO> users) {
        this.id = id;
        this.name = name;
        this.items = items;
        this.users = users;
    }
    
    /**
     * コンストラクタ（食材のみ）
     * - 共有ユーザーは含まない簡易バージョン
     */
    public FridgeDetailDTO(Long id, String name, List<FridgeItemDTO> items) {
        this.id = id;
        this.name = name;
        this.items = items;
    }

    // --- getter / setter ---

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

    public List<FridgeItemDTO> getItems() {
        return items;
    }

    public void setItems(List<FridgeItemDTO> items) {
        this.items = items;
    }
    
    public List<UserSimpleDTO> getUsers() {
    	return users; 
    }
    
    public void setUsers(List<UserSimpleDTO> users) { 
    	this.users = users; 
    }
    
}
