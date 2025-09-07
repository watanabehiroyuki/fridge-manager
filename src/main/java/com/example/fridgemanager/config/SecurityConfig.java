package com.example.fridgemanager.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.fridgemanager.service.CustomUserDetailsService;

@Configuration
public class SecurityConfig {
    
    // ユーザー情報を取得するサービス
    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    /**
     * セキュリティフィルタチェーンの設定
     * 認証・認可のルールを定義
     * フォームログインは無効化（REST API向け構成）
     * 特定のAPIエンドポイントは未認証でもアクセス可能にする
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
        	// REST APIではCSRFトークンは不要のため無効化
            .csrf().disable() 

            .authorizeHttpRequests(authz -> authz
                // 以下のエンドポイントは未認証でもアクセス許可
                .antMatchers(
                    "/api/register",         // ユーザー登録
                    "register-sucess",       // 登録完了ページ
                    "/api/login",            // ログイン処理
                    "/api/notify/send",      // 通知メール送信API（動作確認用など）
                    "/api/logout",           // ログアウト処理
                    "/api/email/test"        // メール送信のテスト用API
                ).permitAll()

                // 上記以外のすべてのリクエストは認証が必要
                .anyRequest().authenticated()
            )

            // デフォルトのログインフォームを無効化
            .formLogin().disable()

            // ログアウト処理の設定
            .logout(logout -> logout
            	// ログアウト時にアクセスされるAPIパス
                .logoutUrl("/api/logout") 
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK); // リダイレクトしない
                })
            )

            .build();
    }

    /**
     * パスワードエンコーダーのBean定義
     * - BCryptを使ってパスワードを安全にハッシュ化
     * - ユーザー登録時・ログイン認証時に使用
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * AuthenticationManagerのBean定義
     * - サービス層で認証処理を行う
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}


