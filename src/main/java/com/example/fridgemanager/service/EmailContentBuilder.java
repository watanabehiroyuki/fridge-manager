package com.example.fridgemanager.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.entity.User;

/**
 * 通知メールの本文を構築するユーティリティクラス。
 */
public class EmailContentBuilder {

    /**
     * 食材の賞味期限通知メールの本文を生成する。
     *
     * @param user 通知先ユーザー
     * @param items 対象のFridgeItemリスト
     * @return メール本文（プレーンテキスト）
     */
    public static String buildNotificationBody(User user, List<FridgeItem> items) {
        StringBuilder sb = new StringBuilder();

        sb.append(user.getUsername()).append("さん、こんにちは！\n\n");
        sb.append("以下の食材がまもなく賞味期限を迎えます：\n\n");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (FridgeItem item : items) {
            sb.append("- ").append(item.getName())
              .append("（").append(item.getExpirationDate().format(formatter)).append("まで）\n");
        }

        sb.append("\nお早めにお召し上がりください。");

        return sb.toString();
    }
}
