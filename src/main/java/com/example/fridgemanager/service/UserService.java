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
    // パスワードをエンコードしてリポジトリに保存する
    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    
    // メールからユーザを取得
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
