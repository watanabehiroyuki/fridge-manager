package com.example.fridgemanager.dto;

/**
 * FridgeRequestDTO
 * - 冷蔵庫を新規作成するリクエスト用DTO
 * - フロントエンドから送られてくる「冷蔵庫名」だけを受け取る
 */
public class FridgeRequestDTO {
    // 冷蔵庫の名前（必須）
    private String name;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}