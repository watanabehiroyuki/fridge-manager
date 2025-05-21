package com.example.fridgemanager.dto;

import java.time.LocalDate;

public class FridgeItemDTO {
    private Long id;
    private String name;
    private String category;
    private int quantity;
    private LocalDate expirationDate;

    public FridgeItemDTO(Long id, String name, String category, int quantity, LocalDate expirationDate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.expirationDate = expirationDate;
    }

    // getterとsetter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public LocalDate getExpirationDate() { return expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }
}
