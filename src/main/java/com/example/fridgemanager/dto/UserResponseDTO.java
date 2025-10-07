package com.example.fridgemanager.dto;

import com.example.fridgemanager.entity.Role;

/**
 * UserResponseDTO
 * - ユーザー情報をフロントに返すためのレスポンスDTO
 * - 主にID、ユーザー名、メールアドレス、ロール（OWNER / MEMBER など）を含む
 */
public class UserResponseDTO {
	// ユーザーID
    private Long id;
    // ユーザー名
    private String username;
    // メールアドレス（ログインID）
    private String email;
    // ロール（OWNER, MEMBER など）
    private Role role;

    /**
     * フルコンストラクタ（ロールあり）
     */
    public UserResponseDTO(Long id, String username, String email, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
    /**
     * 後方互換用のコンストラクタ（ロールなし）
     */
    public UserResponseDTO(Long id, String username, String email) {
        this(id, username, email, null);
    }

    // getterとsetter
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

    public String getEmail() { 
    	return email; 
    }
    
    public void setEmail(String email) { 
    	this.email = email; 
    }
    
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
