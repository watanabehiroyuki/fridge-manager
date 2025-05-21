package com.example.fridgemanager.dto;

import java.util.List;

public class FridgeDetailDTO {
    private Long id;
    private String name;
    private List<FridgeItemDTO> items;

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
}
