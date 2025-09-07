package com.example.fridgemanager.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

/**
 * UserFridgeの複合主キー（user_id + fridge_id）を表す埋め込みクラス
 * - Serializable：JPA仕様により必須
 */
@Embeddable
public class UserFridgeId implements Serializable {
	 // ユーザーID
    private Long userId;
    // 冷蔵庫ID
    private Long fridgeId;
    
    // --- コンストラクタ ---
    public UserFridgeId() {}

    public UserFridgeId(Long userId, Long fridgeId) {
        this.userId = userId;
        this.fridgeId = fridgeId;
    }
    
    // --- Getter / Setter ---
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFridgeId() {
        return fridgeId;
    }

    public void setFridgeId(Long fridgeId) {
        this.fridgeId = fridgeId;
    }

    // --- equals / hashCode ---
    // ※ Set や Map で使う際の同一性判定のために重要
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserFridgeId)) return false;
        UserFridgeId that = (UserFridgeId) o;
        return Objects.equals(userId, that.userId) &&
               Objects.equals(fridgeId, that.fridgeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, fridgeId);
    }
}