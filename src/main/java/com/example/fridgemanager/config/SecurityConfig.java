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

// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import java.util.List;

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
            		.antMatchers("/api/register","register-sucess", "/api/login","/api/notify/send","/api/logout").permitAll() // 認証不要なURL
                .anyRequest().authenticated() // その他は認証が必要
            )
            .formLogin().disable() // ← これ重要！フォームログインは無効
            .logout().logoutUrl("/api/logout") // ログアウトもAPIで
            .permitAll()
            .and()
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

    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    // CorsConfiguration configuration = new CorsConfiguration();
    // configuration.setAllowedOrigins(List.of("http://localhost:5500")); // ← HTMLの表示元に合わせる
    // configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    // configuration.setAllowedHeaders(List.of("*"));
    // configuration.setAllowCredentials(true); // Cookieなどが必要な場合

    // UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    // source.registerCorsConfiguration("/**", configuration);
    // return source;
    // }
}



