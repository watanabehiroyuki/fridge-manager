package com.example.fridgemanager.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Fridge
 * - 冷蔵庫を表すエンティティ
 * - 「冷蔵庫名」に加え、共有ユーザー（UserFridge）と食材（FridgeItem）とのリレーションを持つ
 */

@Entity
@Table(name = "fridges")
public class Fridge {
    // 冷蔵庫ID（主キー）
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 冷蔵庫名
    @Column(nullable = false)
    private String name; // 例：「自宅」「職場」
    // ユーザーとの中間テーブル：user_fridge を通じて多対多で接続
    @OneToMany(mappedBy = "fridge", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserFridge> userFridges = new ArrayList<>();

    // 冷蔵庫に含まれる食材の一覧（1対多）
    @OneToMany(mappedBy = "fridge", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FridgeItem> fridgeItems;

    // --- コンストラクタ ---

    public Fridge() {
    }

    public Fridge(String name) {
    	// 冷蔵庫名
        this.name = name;
    }

    // --- Getter / Setter ---

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

    public List<UserFridge> getUserFridges() {
        return userFridges;
    }

    public void setUserFridges(List<UserFridge> userFridges) {
        this.userFridges = userFridges;
    }
    public List<FridgeItem> getFridgeItems() {
        return fridgeItems;
    }

    public void setFridgeItems(List<FridgeItem> fridgeItems) {
        this.fridgeItems = fridgeItems;
    }
}
