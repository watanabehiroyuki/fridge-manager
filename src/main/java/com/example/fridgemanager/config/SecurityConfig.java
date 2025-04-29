package com.example.fridgemanager.config;

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
	
    private final CustomUserDetailsService customUserDetailsService; // 追加！！

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(authz -> authz
            		.antMatchers("/register", "/login").permitAll() // 認証不要なURL
                .anyRequest().authenticated() // その他は認証が必要
            )
            .formLogin(form -> form
                .loginPage("/login") // ログインページのURL
                .defaultSuccessUrl("/home", true) // 成功時にリダイレクト
                .failureUrl("/login?error=true") // 失敗時
                .permitAll()
            )
            .logout(logout -> logout.permitAll())
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
