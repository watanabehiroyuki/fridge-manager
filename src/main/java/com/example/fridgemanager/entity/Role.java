package com.example.fridgemanager.entity;

/**
 * Role
 * - 冷蔵庫とユーザーの関係における「役割」を定義する列挙型
 * - OWNER: 冷蔵庫の所有者（削除や共有管理などが可能）
 * - MEMBER: 招待された共有メンバー（食材の閲覧・編集などが可能）
 */
public enum Role {
	 // 所有者
    OWNER,
    // メンバー（共有されたユーザー）
    MEMBER
}