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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.dto.LoginRequest;


@RestController
@RequestMapping("/api") // API全体の共通プレフィックス
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * ログイン処理（POST /api/login）
     * - メールアドレスとパスワードを受け取り、
     * - 認証成功すれば、Spring Securityのコンテキストに情報を保存（ログイン状態にする）
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
        	// フロントから来たメールとパスワードでトークンを作る
            UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

            // 認証実行UserDetailsServiceでパスワード照合
            Authentication authentication = authenticationManager.authenticate(token);

            // セッションに認証情報を保存（ログイン状態にする）
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // セッションを開始（なければ作成）
            request.getSession(true);
            // レスポンス返却
            return ResponseEntity.ok().body("{\"message\":\"ログイン成功\"}");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("{\"error\":\"メールアドレスまたはパスワードが違います\"}");
        }
    }

    /**
     * ログイン状態確認（GET /api/auth/check）
     * - 現在のセッションにログインユーザーがいるかチェック
     * - 未ログインなら401、ログイン中ならユーザー名を返す
     */
    @GetMapping("/auth/check")
    public ResponseEntity<?> checkLogin() {
    // 現在の認証情報を取得
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
    // 認証情報が無効 or anonymousUser（未ログイン）なら401を返す
    if (authentication == null || !authentication.isAuthenticated() ||
        authentication.getPrincipal().equals("anonymousUser")) {
        return ResponseEntity.status(401).body("{\"error\":\"未ログイン\"}");
    }

    // ユーザー情報を返す
    Object principal = authentication.getPrincipal();
    String username;

    if (principal instanceof UserDetails) {
        username = ((UserDetails) principal).getUsername();
    } else {
        username = principal.toString();
    }

    return ResponseEntity.ok("{\"username\":\"" + username + "\"}");
    }
    

    /**
     * ログアウト処理（POST /api/logout）
     * - 認証情報とセッションを削除して、ログアウト状態にする
     */
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
