package com.example.fridgemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.entity.User;

@Service
public class NotificationService {

    private final FridgeItemService fridgeItemService;

    @Autowired
    public NotificationService(FridgeItemService fridgeItemService) {
        this.fridgeItemService = fridgeItemService;
    }

    public void sendNotifications() {
    	// 賞味期限から2日前から3日過ぎた食材をリストに入れる
        List<FridgeItem> items = fridgeItemService.getItemsForNotification();
        // 取得した食材でループ
        for (FridgeItem item : items) {
        	// 消費済みなら通知不要
            if (item.isConsumed()) {
                continue; 
            }
            
            // fridge が null の場合もスキップ
            if (item.getFridge() == null || item.getFridge().getUsers() == null) {
                continue; 
            }
            
            List<User> users = item.getFridge().getUsers();
            if (users == null || users.isEmpty()) {
                continue;
            }
            // 冷蔵庫を取得し、それに関連するユーザーを取得しループ
            for (User user : item.getFridge().getUsers()) {
                // 仮の通知処理（本当はメールを送信）
                System.out.println("通知 → " + user.getEmail() +
                        "：[" + item.getName() + "] の賞味期限が " +
                        item.getExpirationDate() + " に近づいています！");
            }
        }
    }
}
