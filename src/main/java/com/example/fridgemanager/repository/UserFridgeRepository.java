package com.example.fridgemanager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fridgemanager.entity.Role;
import com.example.fridgemanager.entity.UserFridge;
import com.example.fridgemanager.entity.UserFridgeId;

public interface UserFridgeRepository extends JpaRepository<UserFridge, UserFridgeId> {
	// 冷蔵庫に紐づくユーザー一覧を取得
    List<UserFridge> findByFridgeId(Long fridgeId);
    // あるユーザーが持つ冷蔵庫一覧を取得
    List<UserFridge> findByUserId(Long userId);
    // 特定ユーザー・冷蔵庫の組み合わせを取得
    Optional<UserFridge> findByUserIdAndFridgeId(Long userId, Long fridgeId);
    // オーナー数のカウント（削除制限用）
    int countByFridgeIdAndRole(Long fridgeId, Role role);
    // 特定の共有ユーザー削除用
    void deleteByUserIdAndFridgeId(Long userId, Long fridgeId);
}