package com.example.fridgemanager.dto;

public class UserResponseDTO {
    private Long id;
    private String username;
    private String email;

    public UserResponseDTO(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // getter
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}
