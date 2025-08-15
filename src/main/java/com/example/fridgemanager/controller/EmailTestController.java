package com.example.fridgemanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.service.EmailService;

@RestController
@RequestMapping("/api/email")
public class EmailTestController {

    private final EmailService emailService;

    @Autowired
    public EmailTestController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/test")
    public String sendTest() {
        emailService.sendTestEmail();
        return "✅ テストメールを送信しました";
    }
}