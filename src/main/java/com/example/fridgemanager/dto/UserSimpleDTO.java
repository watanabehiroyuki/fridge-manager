package com.example.fridgemanager.dto;

public class UserSimpleDTO {
    private Long id;
    private String username;

    public UserSimpleDTO(Long id, String username) {
        this.id = id;
        this.username = username;
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
}
