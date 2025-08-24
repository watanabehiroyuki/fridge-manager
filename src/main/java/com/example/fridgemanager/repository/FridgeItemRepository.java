package com.example.fridgemanager.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.FridgeItem;

@Repository
public interface FridgeItemRepository extends JpaRepository<FridgeItem, Long> {
	 // 部分一致検索用
    List<FridgeItem> findByNameContainingIgnoreCase(String name);
    // 選択した冷蔵庫からの検索用
    List<FridgeItem> findByFridge(Fridge fridge); 
    // 賞味期限昇順に並べて取得する
    List<FridgeItem> findByFridgeOrderByExpirationDateAsc(Fridge fridge);
    // メール送信ようにDBの冷蔵庫とユーザをつないでHibernateのセッションを開く
    @Query("SELECT fi FROM FridgeItem fi " +
    	       "JOIN FETCH fi.fridge f " +
    	       "JOIN FETCH f.userFridges uf " +
    	       "WHERE fi.expirationDate IS NOT NULL " +
    	       "AND fi.consumed = false " +
    	       "AND fi.expirationDate BETWEEN :from AND :to " +
    	       "ORDER BY fi.expirationDate ASC")
    List<FridgeItem> findItemsWithUserFridgesForNotification(@Param("from") LocalDate from, @Param("to") LocalDate to);

}
