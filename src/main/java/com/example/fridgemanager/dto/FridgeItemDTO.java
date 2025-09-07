package com.example.fridgemanager.dto;

import java.time.LocalDate;

/**
 * FridgeItemDTO
 * - 冷蔵庫内の食材情報をフロントエンドに渡すためのDTO
 * - Entityとは異なり、不要な情報を省き、必要な情報だけを送る
 */
public class FridgeItemDTO {
    // 食材ID（主キー）
    private Long id;
    // 食材名
    private String name;
    // カテゴリ
    private String category;
    // 数量
    private int quantity;
    // 賞味期限
    private LocalDate expirationDate;

    /**
     * コンストラクタ（全フィールド指定）
     */
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
