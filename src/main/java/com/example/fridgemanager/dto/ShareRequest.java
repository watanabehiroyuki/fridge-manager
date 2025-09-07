package com.example.fridgemanager.dto;

/**
 * ShareRequest
 * - 冷蔵庫を他ユーザーと共有するためのリクエストDTO
 * - 共有先ユーザーのメールアドレスを受け取る
 *
 */
public class ShareRequest {
    // 共有したい相手ユーザーのメールアドレス
    private String email;

    // getter / setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
