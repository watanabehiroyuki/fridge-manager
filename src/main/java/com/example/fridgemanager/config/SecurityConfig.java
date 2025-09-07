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
	
    private final CustomUserDetailsService customUserDetailsService; // 追加！！

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            .authorizeHttpRequests(authz -> authz
            		// 認証不要なURL"/api/email/test"は動確用
            		.antMatchers("/api/register","register-sucess", "/api/login","/api/notify/send","/api/logout","/api/email/test").permitAll() 
                .anyRequest().authenticated() // その他は認証が必要
            )
            .formLogin().disable() // ← これ重要！フォームログインは無効
            .logout(logout -> logout
            .logoutUrl("/api/logout") // ログアウトもAPIで
            .logoutSuccessHandler((request, response, authentication) -> {
                response.setStatus(HttpServletResponse.SC_OK); // リダイレクトなし
            })
            )
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



