package com.example.fridgemanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.service.NotificationService;

@RestController
@RequestMapping("/api/notify") // 通知関連のAPIの共通プレフィックス
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    /**
     * 通知送信処理をトリガーするエンドポイント
     * - 賞味期限が近いアイテムを抽出し、対象ユーザーへメール通知を送信
     * - 処理のログはバックエンドで確認（SESログなど）
     *
     * @return 通知完了メッセージ（実際の送信状況はログ参照）
     */
    @GetMapping("/send")
    public String sendNotifications() {
        notificationService.sendNotifications();
        return "通知処理が完了しました（ログを確認してください）";
    }
}
