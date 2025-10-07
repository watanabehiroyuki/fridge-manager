package com.example.fridgemanager.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.dto.UserDTO;
import com.example.fridgemanager.dto.UserResponseDTO;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.service.UserService;

@RestController
@RequestMapping("/api") // 共通のAPIパス
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * ユーザー新規登録API（POST /api/register）
     * - ユーザー名・メールアドレス・パスワードを受け取って登録
     * - 確認用パスワードとの一致チェックあり
     * - 登録済みメールアドレスはエラーを返す
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserDTO userDTO) {
            // パスワードと確認用パスワードの一致チェック
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            return ResponseEntity.status(400).body("{\"error\":\"パスワードが一致しません\"}");
        }
        try {
        	// Entity に変換
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword());

            userService.registerUser(user);

            // 成功時はステータス200＋メッセージ
            return ResponseEntity.ok().body("{\"message\":\"登録成功\"}");
        } catch (IllegalArgumentException e) {
            // ID重複などの業務エラー（409 Conflict）
            return ResponseEntity.status(409).body("{\"error\":\"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            // 想定外のエラー（500 Internal Server Error）
            return ResponseEntity.status(500).body("{\"error\":\"サーバーエラー\"}");
        }
    }
    
    /**
     * ユーザー検索API（GET /api/users/search?email=xxx）
     * - メールアドレス完全一致で検索し、存在すればDTOで返す
     * - 見つからなければ404エラー
     */
    @GetMapping("/users/search")
    public ResponseEntity<?> searchUserByEmail(@RequestParam String email) {
    	// メールアドレスで検索
        User user = userService.findByEmail(email);
        if (user == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "ユーザーが見つかりません");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        // 見つかった場合はDTOで返却（パスワードは含めない）
        UserResponseDTO dto = new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
        return ResponseEntity.ok(dto);
    }

}
