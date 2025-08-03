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

@Entity
@Table(name = "fridges")
public class Fridge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // 例：「自宅」「職場」

    @OneToMany(mappedBy = "fridge", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserFridge> userFridges = new ArrayList<>();


    // 食材との1対多
    @OneToMany(mappedBy = "fridge", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FridgeItem> fridgeItems;

    // --- コンストラクタ ---

    public Fridge() {
    }

    public Fridge(String name) {
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
