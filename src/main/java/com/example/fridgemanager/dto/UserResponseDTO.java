package com.example.fridgemanager.dto;

import com.example.fridgemanager.entity.Role;

public class UserResponseDTO {
    private Long id;
    private String username;
    private String email;
    private Role role;

    public UserResponseDTO(Long id, String username, String email, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
    // role なしの従来バージョン（後方互換）
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
