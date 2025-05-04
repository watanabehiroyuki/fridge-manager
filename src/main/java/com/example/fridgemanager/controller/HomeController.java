package com.example.fridgemanager.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.service.FridgeService;

@Controller
public class HomeController {

    @Autowired
    private FridgeService fridgeService;

    @GetMapping("/home")
    public String home(Model model, Principal principal) {
    	// ログイン中のユーザーのメールから冷蔵庫を取得
        String email = principal.getName(); 
        List<Fridge> fridges = fridgeService.getFridgesByUserEmail(email);
        model.addAttribute("fridges", fridges);
        return "home";
    }
}
