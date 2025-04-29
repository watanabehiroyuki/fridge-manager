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

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // メールアドレスでユーザーを検索
        User user = userRepository.findByEmail(email);

        // ユーザーが見つからない場合はエラー
        if (user == null) {
            throw new UsernameNotFoundException("ユーザーが見つかりません");
        }

        // ここで、ユーザーの情報をSpring Security用に変換
        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getEmail())  // メールアドレスをユーザー名として使用
                .password(user.getPassword())  // パスワードをセット
                .authorities("USER")  // 権限（今回は簡単に"USER"とする）
                .build();
    }
}

