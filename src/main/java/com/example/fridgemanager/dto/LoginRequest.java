package com.example.fridgemanager.dto;

/**
 * LoginRequest
 * - ログイン時のリクエストボディを受け取るDTO
 * - フロントエンドから送信される「メールアドレス」と「パスワード」を受け取る
 */
public class LoginRequest {
    // メールアドレス（ログインID）
    private String email;
    // パスワード
    private String password;

    // getter/setter
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
