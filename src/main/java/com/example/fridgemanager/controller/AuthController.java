package com.example.fridgemanager.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.dto.LoginRequest;


@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
        	// フロントから来たメールとパスワードでトークンを作る
            UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

            // 認証処理
            Authentication authentication = authenticationManager.authenticate(token);

            // セッションに認証情報を保存（ログイン状態にする）
            SecurityContextHolder.getContext().setAuthentication(authentication);
            request.getSession(true); // セッションを開始（なければ作成）

            return ResponseEntity.ok().body("{\"message\":\"ログイン成功\"}");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("{\"error\":\"メールアドレスまたはパスワードが違います\"}");
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // ログイン状態のクリア
        SecurityContextHolder.clearContext();

        // セッション破棄（ログイン情報を忘れさせる）
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok("{\"message\": \"ログアウト成功\"}");
    }
}
