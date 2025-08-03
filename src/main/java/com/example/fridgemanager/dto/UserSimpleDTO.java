package com.example.fridgemanager.dto;

import com.example.fridgemanager.entity.Role;

public class UserSimpleDTO {
    private Long id;
    private String username;
    private Role role;

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
