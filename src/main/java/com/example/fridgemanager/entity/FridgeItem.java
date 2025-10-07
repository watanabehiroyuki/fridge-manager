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

/**
 * FridgeItem
 * - 冷蔵庫に登録された「食材」を表すエンティティ
 * - どの冷蔵庫に属しているか、カテゴリ、数量、賞味期限、通知済みかどうかなどを持つ
 */
@Entity
@Table(name = "fridge_items") 
public class FridgeItem {

    // 食材ID（主キー）
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 食材名
    private String name; 
    // カテゴリ
    private String category; 
    // 数量
    private int quantity; 
    // 賞味期限
    private LocalDate expirationDate; 
    
    // 最後に通知を送信した日（通知機能の重複防止に使用）
    @Column(name = "last_notified_date")
    private LocalDate lastNotifiedDate;
    // 消費済みフラグ（true: 消費済み, false: まだ残っている）
    @Column(columnDefinition = "TINYINT(1)")
    private boolean consumed = false; // 消費済み
    
    // 関連付けられた冷蔵庫（多対一）    
    @ManyToOne
    @JoinColumn(name = "fridge_id", nullable = false)
    private Fridge fridge;

    // --- equals と hashCode ---
    // Setなどでオブジェクトの重複判定に使用する
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FridgeItem that = (FridgeItem) o;
        return id != null && id.equals(that.id);
    }

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
