package com.example.fridgemanager.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.entity.UserFridge;

@Service
public class NotificationService {

    private final FridgeItemService fridgeItemService;
    private final EmailService emailService;

    @Autowired
    public NotificationService(FridgeItemService fridgeItemService, EmailService emailService) {
        this.fridgeItemService = fridgeItemService;
        this.emailService = emailService;
    }

    // 毎朝9時に自動実行（Asia/Tokyo 時間）
    @Scheduled(cron = "0 0 9 * * ?", zone = "Asia/Tokyo")
    public void runNotificationBatch() {
        System.out.println("🔔 通知バッチを実行中...");
        // 既存メソッドを呼び出し
        sendNotifications(); 
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
            if (item.getFridge() == null || item.getFridge().getUserFridges() == null) {
                continue; 
            }
            
            // Fridge に紐づく全ての UserFridge 経由でユーザーを取得
            for (UserFridge uf : item.getFridge().getUserFridges()) {
                User user = uf.getUser();
                if (user == null) continue;
                
            	String subject = "【冷蔵庫管理】賞味期限が近い食材があります";
            	String body = EmailContentBuilder.buildNotificationBody(user, Collections.singletonList(item));
            	emailService.sendEmail(user.getEmail(), subject, body);
            }
        }
    }
}
