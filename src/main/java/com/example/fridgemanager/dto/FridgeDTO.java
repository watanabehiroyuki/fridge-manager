package com.example.fridgemanager.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.entity.UserFridge;

public class FridgeDTO {
    private Long id;
    private String name;
    private List<UserResponseDTO> users = new ArrayList<>();

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
