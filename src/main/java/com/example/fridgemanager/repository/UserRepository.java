package com.example.fridgemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fridgemanager.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // メールアドレスで検索するためのメソッド（ログインや通知時に便利）
    User findByEmail(String email);

    // 必要に応じて他の検索メソッドを追加
}
