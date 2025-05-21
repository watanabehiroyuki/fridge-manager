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
@RequestMapping("/api/fridges/{fridgeId}/items")  // 冷蔵庫ごとのアイテム操作に変更
@CrossOrigin
public class FridgeItemController {

    private final FridgeItemService fridgeItemService;
    private final FridgeRepository fridgeRepository;

    @Autowired
    public FridgeItemController(FridgeItemService fridgeItemService, FridgeRepository fridgeRepository) {
        this.fridgeItemService = fridgeItemService;
        this.fridgeRepository = fridgeRepository;
    }

    // 冷蔵庫に食材を追加する
    @PostMapping
    public FridgeItem createItem(
        @PathVariable Long fridgeId,
        @RequestBody FridgeItem item
    ) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
                .orElseThrow(() -> new RuntimeException("Fridge not found"));
        return fridgeItemService.createItem(item, fridge);
    }

    // 冷蔵庫ごとのアイテム一覧取得
    @GetMapping
    public List<FridgeItemDTO> getItemsByFridge(@PathVariable Long fridgeId) {
        Fridge fridge = fridgeRepository.findById(fridgeId)
                .orElseThrow(() -> new RuntimeException("Fridge not found"));
        List<FridgeItem> items = fridgeItemService.getItemsByFridge(fridge);
        List<FridgeItemDTO> dtoList = new ArrayList<>();

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

    // 通知対象アイテムの取得（全冷蔵庫からでOKの場合）
    @GetMapping("/notify")
    public List<FridgeItem> getItemsForNotification() {
        return fridgeItemService.getItemsForNotification();
    }

    @GetMapping("/{itemId}")
    public FridgeItem getItem(
        @PathVariable Long fridgeId,
        @PathVariable Long itemId
    ) {
        Optional<FridgeItem> optionalItem = fridgeItemService.getItemById(itemId);
        return optionalItem.orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @PutMapping("/{itemId}")
    public FridgeItem updateItem(
        @PathVariable Long fridgeId,
        @PathVariable Long itemId,
        @RequestBody FridgeItem updatedItem
    ) {
        return fridgeItemService.updateItem(itemId, updatedItem);
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(
        @PathVariable Long fridgeId,
        @PathVariable Long itemId
    ) {
        fridgeItemService.deleteItem(itemId);
    }
}
