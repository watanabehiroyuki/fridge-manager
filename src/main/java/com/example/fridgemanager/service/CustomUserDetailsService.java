package com.example.fridgemanager.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Spring Security が認証時に呼び出すメソッド。
     * メールアドレスを「ユーザー名」として使用し、対応するユーザー情報を取得する。
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // メールアドレスでユーザーを検索
        User user = userRepository.findByEmail(email);

        // ユーザーが見つからない場合はエラー
        if (user == null) {
            throw new UsernameNotFoundException("ユーザーが見つかりません");
        }

     // Spring Security 用の UserDetails を生成して返却
        return org.springframework.security.core.userdetails.User
                .builder()
                // メールアドレスをユーザー名として使用
                .username(user.getEmail())  
                // エンコード済みのパスワードを使用
                .password(user.getPassword())
                // 権限
                .authorities("USER")  
                .build();
    }
}

