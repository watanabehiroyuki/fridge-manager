package com.example.fridgemanager.dto;

import java.util.List;

public class FridgeDetailDTO {
    private Long id;
    private String name;
    private List<FridgeItemDTO> items;
    private List<UserSimpleDTO> users;

    public FridgeDetailDTO(Long id, String name, List<FridgeItemDTO> items, List<UserSimpleDTO> users) {
        this.id = id;
        this.name = name;
        this.items = items;
        this.users = users;
    }
    
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
