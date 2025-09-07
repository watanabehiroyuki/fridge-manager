package com.example.fridgemanager.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

/**
 * ユーザーと冷蔵庫の中間エンティティ（多対多）
 * - 1人のユーザーが複数の冷蔵庫を共有可能
 * - 1つの冷蔵庫を複数人で共有可能
 * - 所有者 / メンバー の役割をRoleで管理
 */
@Entity
@Table(name = "user_fridge")
public class UserFridge {

    /**
     * 組み合わせ主キー（user_id + fridge_id）
     * - EmbeddedIdとしてUserFridgeIdクラスを使用
     */
    @EmbeddedId
    private UserFridgeId id = new UserFridgeId();

    /**
     * ユーザーとの関連（多対一）
     * - MapsIdで複合キーの一部にマッピング
     */
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 冷蔵庫との関連（多対一）
     * - MapsIdで複合キーの一部にマッピング
     */
    @ManyToOne
    @MapsId("fridgeId")
    @JoinColumn(name = "fridge_id", nullable = false)
    private Fridge fridge;

    /**
     * 役割（OWNER または MEMBER）
     * - EnumをString型で保存
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // --- コンストラクタ ---
    public UserFridge() {}

    public UserFridge(User user, Fridge fridge, Role role) {
        this.user = user;
        this.fridge = fridge;
        this.role = role;
        this.id = new UserFridgeId(user.getId(), fridge.getId());
    }

    // --- Getter / Setter ---

    public UserFridgeId getId() {
        return id;
    }

    public void setId(UserFridgeId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        this.id.setUserId(user.getId()); 
    }

    public Fridge getFridge() {
        return fridge;
    }

    public void setFridge(Fridge fridge) {
        this.fridge = fridge;
        this.id.setFridgeId(fridge.getId());
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}