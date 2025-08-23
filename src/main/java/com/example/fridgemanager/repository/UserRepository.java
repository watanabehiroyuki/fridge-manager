package com.example.fridgemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.fridgemanager.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // メールアドレスで検索するためのメソッド（ログインや通知時に便利）
    User findByEmail(String email);
    
    // メールアドレスの重複チェック
    boolean existsByEmail(String email);

    // 必要に応じて他の検索メソッドを追加
    
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.userFridges WHERE u.email = :email")
    User findByEmailWithFridges(@Param("email") String email);
}
