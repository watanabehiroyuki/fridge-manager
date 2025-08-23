package com.example.fridgemanager.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        LocalDate today = LocalDate.now();
        List<FridgeItem> notifiedItems = new ArrayList<>();
        
        // ユーザーごとに食材をまとめる
        Map<User, List<FridgeItem>> userItemMap = new HashMap<>();
        
        // 取得した食材でループ
        for (FridgeItem item : items) {
        	// 消費済みなら通知不要
            if (item.isConsumed()) continue; 
            if (item.getExpirationDate() == null) continue;
            
            // 今日すでに通知済みならスキップ
            if (item.getLastNotifiedDate() != null && item.getLastNotifiedDate().isEqual(today)) {
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
                
                // Map に追加
                userItemMap.putIfAbsent(user, new ArrayList<>());
                userItemMap.get(user).add(item);
            }
            // 通知済みに記録（item に対して1回だけ）
            item.setLastNotifiedDate(today);
            notifiedItems.add(item);
        }
        
        // ユーザーごとに通知送信
        for (Map.Entry<User, List<FridgeItem>> entry : userItemMap.entrySet()) {
            User user = entry.getKey();
            List<FridgeItem> userItems = entry.getValue();
                
            	String subject = "【冷蔵庫管理】" + userItems.size() + "件の食材がまもなく賞味期限を迎えます";
            	String body = EmailContentBuilder.buildNotificationBody(user,userItems);
            	emailService.sendEmail(user.getEmail(), subject, body);
        }
        
        // 通知済みに更新（まとめて保存）
        fridgeItemService.saveAll(notifiedItems);
        
        System.out.println("🔔 通知対象ユーザー数: " + userItemMap.size());
    }
}
