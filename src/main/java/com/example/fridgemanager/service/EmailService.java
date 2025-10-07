package com.example.fridgemanager.service;

import org.springframework.stereotype.Service;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Message;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;
import software.amazon.awssdk.services.ses.model.SesException;

@Service
public class EmailService {
	// SESにアクセスするためのクライアント
    private final SesClient sesClient;

    public EmailService() {
        this.sesClient = SesClient.builder()
            .region(Region.AP_NORTHEAST_1) // 東京リージョン
            .build();
    }

    /**
     * 実際にメールを送信する処理
     *
     * @param toAddress 送信先メールアドレス（検証済み）
     * @param subject   メールの件名
     * @param body      メール本文（プレーンテキスト）
     */
    public void sendEmail(String toAddress, String subject, String body) {
        try {
        	// 宛先設定
            Destination destination = Destination.builder()
                .toAddresses(toAddress)
                .build();

            // 件名・本文を作成
            Content contentSubject = Content.builder()
                .data(subject)
                .build();

            Content contentBody = Content.builder()
                .data(body)
                .build();

            Body bodyContent = Body.builder()
                .text(contentBody)
                .build();

            // メッセージ全体構築
            Message message = Message.builder()
                .subject(contentSubject)
                .body(bodyContent)
                .build();

            // 送信リクエストを作成
            SendEmailRequest request = SendEmailRequest.builder()
                .source("") // SESで認証済みの送信元
                .destination(destination)
                .message(message)
                .build();

            // 送信処理
            sesClient.sendEmail(request);

            System.out.println("✅ メール送信成功: " + toAddress);

        } catch (SesException e) {
            System.err.println("❌ メール送信失敗: " + e.awsErrorDetails().errorMessage());
        }
    }
    
    /**
     * 確認用のテストメール送信処理
     */
    public void sendTestEmail() {
    try {
        String to = ""; // SESでVerifyしたアドレスに変更
        String subject = "【冷蔵庫管理】テストメール";
        String body = "これはAmazon SESからのテストメールです。";

        System.out.println("📨 メール送信処理開始");
        sendEmail(to, subject, body);
        System.out.println("✅ sendEmail() 実行完了");
    } catch (SesException e) {
        System.err.println("❌ SES 例外発生");
        e.printStackTrace();
        System.err.println("❌ エラー詳細: " + e.awsErrorDetails().errorMessage());
    } catch (Exception e) {
        System.err.println("❌ その他の例外発生");
        e.printStackTrace();
    }
    }
}
