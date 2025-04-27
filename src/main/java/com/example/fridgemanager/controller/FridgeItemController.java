package com.example.fridgemanager.controller;

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

import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.service.FridgeItemService;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class FridgeItemController {

    private final FridgeItemService fridgeItemService;

    @Autowired
    public FridgeItemController(FridgeItemService fridgeItemService) {
        this.fridgeItemService = fridgeItemService;
    }

    @PostMapping
    public FridgeItem createItem(@RequestBody FridgeItem item) {
        return fridgeItemService.createItem(item);
    }

    @GetMapping
    public List<FridgeItem> getAllItems() {
        return fridgeItemService.getAllItems();
    }

    @GetMapping("/notify")
    public List<FridgeItem> getItemsForNotification() {
        return fridgeItemService.getItemsForNotification();
    }
    
    @GetMapping("/{id:\\d+}")
    public FridgeItem getItem(@PathVariable Long id) {
        Optional<FridgeItem> optionalItem = fridgeItemService.getItemById(id);
        if (optionalItem.isPresent()) {
            return optionalItem.get();
        } else {
            throw new RuntimeException("Item not found");
        }
    }


    @PutMapping("/{id:\\d+}")
    public FridgeItem updateItem(@PathVariable Long id, @RequestBody FridgeItem updatedItem) {
        return fridgeItemService.updateItem(id, updatedItem);
    }

    @DeleteMapping("/{id:\\d+}")
    public void deleteItem(@PathVariable Long id) {
        fridgeItemService.deleteItem(id);
    }
    

}
