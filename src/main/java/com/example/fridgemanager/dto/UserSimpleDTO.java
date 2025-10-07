package com.example.fridgemanager.dto;

import com.example.fridgemanager.entity.Role;

/**
 * UserSimpleDTO
 * - 冷蔵庫に紐づくユーザーの簡易情報を返すためのDTO
 * - ユーザーID・ユーザー名・ロール（OWNER / MEMBER）を持つ
 * - メールアドレスなどの個人情報は含まない
 */
public class UserSimpleDTO {
    // ユーザーID
    private Long id;
    // 表示用ユーザー名
    private String username;
    // ロール（OWNER または MEMBER）
    private Role role;
    
    /**
     * コンストラクタ
     */
    public UserSimpleDTO(Long id, String username, Role role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    // Getter & Setter
    public Long getId() { 
    	return id; 
    }
    public void setId(Long id) { 
    	this.id = id; 
    }
    public String getUsername() { 
    	return username; 
    }
    public void setUsername(String username) { 
    	this.username = username; 
    }
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
