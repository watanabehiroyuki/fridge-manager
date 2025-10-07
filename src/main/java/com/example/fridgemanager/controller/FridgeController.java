package com.example.fridgemanager.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.dto.FridgeDTO;
import com.example.fridgemanager.dto.FridgeDetailDTO;
import com.example.fridgemanager.dto.FridgeItemDTO;
import com.example.fridgemanager.dto.FridgeRequestDTO;
import com.example.fridgemanager.dto.ShareRequest;
import com.example.fridgemanager.dto.UserResponseDTO;
import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.entity.User;
import com.example.fridgemanager.repository.UserRepository;
import com.example.fridgemanager.service.FridgeItemService;
import com.example.fridgemanager.service.FridgeService;

@RestController
@RequestMapping("/api/fridges") // 冷蔵庫を扱うエンドポイント
@CrossOrigin
public class FridgeController {

    private final FridgeService fridgeService;
    private final UserRepository userRepository;
    private final FridgeItemService fridgeItemService;


    @Autowired
    public FridgeController(FridgeService fridgeService, UserRepository userRepository, FridgeItemService fridgeItemService) {
        this.fridgeService = fridgeService;
        this.userRepository = userRepository;
        this.fridgeItemService = fridgeItemService;
    }

    /**
     * 冷蔵庫を新規作成する
     * - リクエストされた名前で冷蔵庫を作成し、ログイン中のユーザーに紐付ける
     */
    @PostMapping
    public Fridge createFridge(@RequestBody FridgeRequestDTO request, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return fridgeService.createFridge(user, request.getName());
    }
    
    /**
     * ログイン中ユーザーに紐づく冷蔵庫の一覧を取得する
     */
    @GetMapping
    public List<FridgeDTO> getUserFridges(Principal principal) {
        String email = principal.getName();
        List<Fridge> fridges = fridgeService.getFridgesByUserEmail(email);

        List<FridgeDTO> dtoList = new ArrayList<>();
        for (Fridge fridge : fridges) {
            dtoList.add(new FridgeDTO(fridge.getId(), fridge.getName()));
        }

        return dtoList;
    }

    /**
    * 指定されたIDの冷蔵庫情報を取得（必要に応じて使用）
    */
    @GetMapping("/{id}")
    public Fridge getFridge(@PathVariable Long id) {
        return fridgeService.getFridgeById(id);
    }
    
    /**
     * 冷蔵庫の詳細（食材リスト付き）を取得する
     */
    @GetMapping("/{id}/detail")
    public FridgeDetailDTO getFridgeDetail(@PathVariable Long id) {
        Fridge fridge = fridgeService.getFridgeById(id);
        List<FridgeItem> items = fridgeItemService.getItemsByFridge(fridge);
        
        List<FridgeItemDTO> itemDTOs = new ArrayList<>();
        for (FridgeItem item : items) {
            itemDTOs.add(new FridgeItemDTO(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getQuantity(),
                item.getExpirationDate()
            ));
        }

        return new FridgeDetailDTO(fridge.getId(), fridge.getName(), itemDTOs);
    }
    
    /**
     * 冷蔵庫を他ユーザーと共有する（メール指定）
     */
    @PostMapping("/{fridgeId}/share")
    public FridgeDTO shareFridge(@PathVariable Long fridgeId, @RequestBody ShareRequest request) {
    	Fridge fridge = fridgeService.addUserToFridge(fridgeId, request.getEmail());
        return new FridgeDTO(fridge);
    }
    
    /**
     * 冷蔵庫に共有されているユーザー一覧を取得
     */
    @GetMapping("/{fridgeId}/users")
    public List<UserResponseDTO> getFridgeUsers(@PathVariable Long fridgeId) {
        List<User> users = fridgeService.getUsersByFridgeId(fridgeId);
        List<UserResponseDTO> response = new ArrayList<>();

        for (User user : users) {
            response.add(new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail()));
        }

        return response;
    }

    /**
     * 冷蔵庫の共有から特定ユーザーを削除する
     */
    @DeleteMapping("/{fridgeId}/users/{userId}")
    public void removeFridgeUser(@PathVariable Long fridgeId, @PathVariable Long userId) {
        fridgeService.removeUserFromFridge(fridgeId, userId);
    }
    
    /**
     * 冷蔵庫自体を削除する（オーナーのみ許可）
     */
    @DeleteMapping("/{fridgeId}")
    public void deleteFridge(@PathVariable Long fridgeId, Principal principal) {
        // 現在ログイン中のユーザーを取得
        User requestingUser = userRepository.findByEmail(principal.getName());
        // サービスに冷蔵庫IDとリクエストユーザーを渡す
        fridgeService.deleteFridge(fridgeId, requestingUser);
    }
    
    /**
     * 所有・共有中の冷蔵庫＋食材リストをすべて取得する
     * - ホーム画面で一括表示する
     */
    @GetMapping("/with-details")
    public List<FridgeDetailDTO> getFridgeDetails(Principal principal) {
        return fridgeService.getFridgeDetailsByUserEmail(principal.getName());
    }
    
}
