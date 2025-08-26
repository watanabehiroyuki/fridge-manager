package com.example.fridgemanager.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "fridge_items") 
public class FridgeItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // 食材名

    private String category; // カテゴリ（例：野菜、肉、乳製品など）

    private int quantity; // 数量

    private LocalDate expirationDate; // 賞味期限
    
    @Column(name = "last_notified_date")
    private LocalDate lastNotifiedDate;
    
    @Column(columnDefinition = "TINYINT(1)")
    private boolean consumed = false; // 消費済み
    
    @ManyToOne
    @JoinColumn(name = "fridge_id", nullable = false)
    private Fridge fridge;

    // Setにおいて2つのオブジェクトが「同じか？」を判断
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FridgeItem that = (FridgeItem) o;
        return id != null && id.equals(that.id);
    }

    // SetやMapなどが内部で使う"データの位置を探すための番号（ハッシュ値）"**を返す
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    // ゲッター・セッター
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
     
    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
    
    public LocalDate getLastNotifiedDate() {
        return lastNotifiedDate;
    }

    public void setLastNotifiedDate(LocalDate lastNotifiedDate) {
        this.lastNotifiedDate = lastNotifiedDate;
    }
    
    public boolean isConsumed() {
        return consumed;
    }

    public void setConsumed(boolean consumed) {
        this.consumed = consumed;
    }

    public Fridge getFridge() {
        return fridge;
    }

    public void setFridge(Fridge fridge) {
        this.fridge = fridge;
    }
}
