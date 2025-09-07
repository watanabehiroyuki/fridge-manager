package com.example.fridgemanager.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    /**
     * 通知バッチ処理（毎朝9時実行）
     */
    @Scheduled(cron = "0 0 9 * * ?", zone = "Asia/Tokyo")
    public void runNotificationBatch() {
        System.out.println("🔔 通知バッチを実行中...");
        // 既存メソッドを呼び出し
        sendNotifications(); 
    }
    
    /**
     * 古い食材の自動削除（毎朝8:30実行）
     * 賞味期限から1週間以上経過した食材を削除
     */
    @Scheduled(cron = "0 30 8 * * ?", zone = "Asia/Tokyo")
    public void deleteOldExpiredItems() {
        // 
        List<FridgeItem> oldItems = fridgeItemService.getItemsExpiredOverAWeek();

        for (FridgeItem item : oldItems) {
            fridgeItemService.deleteItem(item.getId());
        }

        System.out.println("🗑️ 削除件数: " + oldItems.size());
    }
    
    /**
     * 食材の通知処理（賞味期限が近い or 過ぎて間もない食材）
     * 2日前〜3日後まで通知対象。消費済・通知済み・期限なしのものは除外。
     */
    @Transactional
    public void sendNotifications() {
    	// 賞味期限から2日前から3日過ぎた食材をリストに入れる
        List<FridgeItem> items = fridgeItemService.getItemsForNotification();
        LocalDate today = LocalDate.now();
        List<FridgeItem> notifiedItems = new ArrayList<>();
        
        // ユーザーごとに食材をまとめる
        Map<User, Set<FridgeItem>> userItemMap = new HashMap<>();
        
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
            
            // Fridge に紐づく全ユーザーへ通知対象として追加
            for (UserFridge uf : item.getFridge().getUserFridges()) {
                User user = uf.getUser();
                if (user == null) continue;
                
                userItemMap.putIfAbsent(user, new HashSet<>());
                userItemMap.get(user).add(item);
            }
            // 通知済みに記録
            item.setLastNotifiedDate(today);
            notifiedItems.add(item);
        }
        
        // ユーザーごとに通知送信
        for (Map.Entry<User, Set<FridgeItem>> entry : userItemMap.entrySet()) {
            User user = entry.getKey();
            List<FridgeItem> userItems = new ArrayList<>(entry.getValue());
                
            	String subject = "【冷蔵庫管理】" + userItems.size() + "件の食材がまもなく賞味期限を迎えます";
            	String body = EmailContentBuilder.buildNotificationBody(user,userItems);
            	emailService.sendEmail(user.getEmail(), subject, body);
        }
        
        // 通知済みに更新（まとめて保存）
        fridgeItemService.saveAll(notifiedItems);
        
        System.out.println("🔔 通知対象ユーザー数: " + userItemMap.size());
    }
}
