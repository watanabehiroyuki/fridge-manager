package com.example.fridgemanager.dto;

/**
 * UserDTO
 * - ユーザー新規登録の際に使用するリクエストDTO
 * - フロントエンドから送られるユーザー情報（ユーザー名、メール、パスワード、確認用パスワード）を保持する
 * 
 */
public class UserDTO {
    // 表示用ユーザー名
    private String username;
    // メールアドレス
    private String email;
    // パスワード
    private String password;
 // 確認用パスワード（パスワードと一致しているかを登録時に検証）
    private String confirmPassword;

    // --- Getter / Setter ---
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
