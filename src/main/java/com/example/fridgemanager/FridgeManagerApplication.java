package com.example.fridgemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FridgeManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FridgeManagerApplication.class, args);
    }
}
