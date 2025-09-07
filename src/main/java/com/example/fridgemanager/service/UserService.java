package com.example.fridgemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * ユーザーを新規登録（メールアドレス重複チェック + パスワード暗号化）
     */
    public void registerUser(User user) {
    	// メールの重複チェック
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("このメールアドレスは既に登録されています");
        }
        // パスワードをハッシュ化して保存
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    
    /**
     * メールアドレスでユーザーを検索
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
