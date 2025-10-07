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

@Entity
@Table(name = "user_fridge")
public class UserFridge {

    @EmbeddedId
    private UserFridgeId id = new UserFridgeId();

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("fridgeId")
    @JoinColumn(name = "fridge_id", nullable = false)
    private Fridge fridge;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

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