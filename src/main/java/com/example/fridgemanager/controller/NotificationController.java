package com.example.fridgemanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.service.NotificationService;

@RestController
@RequestMapping("/api/notify")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/send")
    public String sendNotifications() {
        notificationService.sendNotifications();
        return "通知処理が完了しました（ログを確認してください）";
    }
}
