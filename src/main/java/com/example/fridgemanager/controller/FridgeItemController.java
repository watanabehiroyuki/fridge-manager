package com.example.fridgemanager.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fridgemanager.dto.FridgeItemDTO;
import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.repository.FridgeRepository;
import com.example.fridgemanager.service.FridgeItemService;

@RestController
@RequestMapping("/api/fridges/{fridgeId}/items")  // 各冷蔵庫の食材を扱うエンドポイント
@CrossOrigin
public class FridgeItemController {

    private final FridgeItemService fridgeItemService;
    private final FridgeRepository fridgeRepository;

    @Autowired
    public FridgeItemController(FridgeItemService fridgeItemService, FridgeRepository fridgeRepository) {
        this.fridgeItemService = fridgeItemService;
        this.fridgeRepository = fridgeRepository;
    }

    /**
     * 食材を新規追加する（指定した冷蔵庫IDに紐づけて登録）
     */
    @PostMapping
    public FridgeItem createItem(
        @PathVariable Long fridgeId,
        @RequestBody FridgeItem item
    ) {
    	// 冷蔵庫IDが存在するか確認（なければ例外）
        Fridge fridge = fridgeRepository.findById(fridgeId)
                .orElseThrow(() -> new RuntimeException("Fridge not found"));
        // サービス経由で保存処理
        return fridgeItemService.createItem(item, fridge);
    }

    /**
     * 指定された冷蔵庫の全食材リストを取得（DTO形式で返す）
     */
    @GetMapping
    public List<FridgeItemDTO> getItemsByFridge(@PathVariable Long fridgeId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
                .orElseThrow(() -> new RuntimeException("Fridge not found"));
        List<FridgeItem> items = fridgeItemService.getItemsByFridge(fridge);
        List<FridgeItemDTO> dtoList = new ArrayList<>();

        // EntityをDTO に変換
        for (FridgeItem item : items) {
            dtoList.add(new FridgeItemDTO(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getQuantity(),
                item.getExpirationDate()
            ));
        }

        return dtoList;
    }

    /**
     * 通知対象となる食材のリストを取得
     * - 冷蔵庫ごとの指定はなし（全アイテム対象）
     * - 賞味期限が近い or 過ぎた食材を抽出する
     */
    @GetMapping("/notify")
    public List<FridgeItem> getItemsForNotification() {
        return fridgeItemService.getItemsForNotification();
    }

    /**
     *　特定の食材アイテムをID指定で取得
     */
    @GetMapping("/{itemId}")
    public FridgeItem getItem(
        @PathVariable Long fridgeId,
        @PathVariable Long itemId
    ) {
        Optional<FridgeItem> optionalItem = fridgeItemService.getItemById(itemId);
        return optionalItem.orElseThrow(() -> new RuntimeException("Item not found"));
    }

    /**
     * 食材情報の更新
     */
    @PutMapping("/{itemId}")
    public FridgeItem updateItem(
        @PathVariable Long fridgeId,
        @PathVariable Long itemId,
        @RequestBody FridgeItem updatedItem
    ) {
        return fridgeItemService.updateItem(itemId, updatedItem);
    }

    /**
     * 食材の削除処理
     * - 食材IDを指定して削除
     */
    @DeleteMapping("/{itemId}")
    public void deleteItem(
        @PathVariable Long fridgeId,
        @PathVariable Long itemId
    ) {
        fridgeItemService.deleteItem(itemId);
    }
}
