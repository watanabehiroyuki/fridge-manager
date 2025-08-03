package com.example.fridgemanager.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class UserFridgeId implements Serializable {

    private Long userId;
    private Long fridgeId;

    public UserFridgeId() {}

    public UserFridgeId(Long userId, Long fridgeId) {
        this.userId = userId;
        this.fridgeId = fridgeId;
    }

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