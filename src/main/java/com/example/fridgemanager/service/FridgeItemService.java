package com.example.fridgemanager.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fridgemanager.entity.Fridge;
import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.repository.FridgeItemRepository;

@Service
public class FridgeItemService {

	// 全件取得（通知デバッグ用）
	public List<FridgeItem> getAllItems() {
	    return fridgeItemRepository.findAll();
	}
    private final FridgeItemRepository fridgeItemRepository;

    @Autowired
    public FridgeItemService(FridgeItemRepository fridgeItemRepository) {
        this.fridgeItemRepository = fridgeItemRepository;
    }
    
    // 食材を保存する（賞味期限の自動設定付き）
    public FridgeItem createItem(FridgeItem item, Fridge fridge) {
    	// 冷蔵庫との関連をセット
    	item.setFridge(fridge);
    	if (item.getExpirationDate() == null) {
    		item.setExpirationDate(calculateDefaultExpiration(item.getName(),item.getCategory()));
    	}
        return fridgeItemRepository.save(item);
    }
    
    // 賞味期限を名前に応じて計算（自動設定ロジック）
    private LocalDate calculateDefaultExpiration(String name, String category) {
        if (name.contains("じゃがいも")) {
            return LocalDate.now().plusMonths(3);
        } else if (name.contains("玉ねぎ")) {
            return LocalDate.now().plusMonths(2);
        } else if (category.contains("魚")) {
        	return LocalDate.now().plusDays(2);
        } else if (category.contains("肉")) {
        	return LocalDate.now().plusDays(2);
        } else if (name.contains("魚")) {
        	return LocalDate.now().plusDays(2);
        } else {
            return LocalDate.now().plusWeeks(1);
        }
    }
    
    // 全件取得
    public List<FridgeItem> getItemsByFridge(Fridge fridge) {
    	return fridgeItemRepository.findByFridgeOrderByExpirationDateAsc(fridge);
    }

    // 賞味期限が早い順にソートする
    public List<FridgeItem> getItemsSortedByExpiration() {
        List<FridgeItem> items = fridgeItemRepository.findAll();
        Comparator<FridgeItem> expirationComparator = new Comparator<FridgeItem>() {
            @Override
            public int compare(FridgeItem a, FridgeItem b) {
                if (a.getExpirationDate() == null) return 1;
                if (b.getExpirationDate() == null) return -1;
                return a.getExpirationDate().compareTo(b.getExpirationDate());
            }
        };
        items.sort(expirationComparator);
        return items;
    }

    
    
    public Optional<FridgeItem> getItemById(Long id) {
        return fridgeItemRepository.findById(id);
    }

    // 名前で検索（部分一致）
    public List<FridgeItem> searchByName(String keyword) {
        return fridgeItemRepository.findByNameContainingIgnoreCase(keyword);
    }
    
    // 登録したものに変更があった場合更新される
    public FridgeItem updateItem(Long id, FridgeItem updatedItem) {
        return fridgeItemRepository.findById(id).map(item -> {
            item.setName(updatedItem.getName());
            item.setCategory(updatedItem.getCategory());
            item.setQuantity(updatedItem.getQuantity());
            item.setExpirationDate(updatedItem.getExpirationDate());
            return fridgeItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Item not found"));
    }
    
    // 消費したら削除する
    public void deleteItem(Long id) {
        fridgeItemRepository.deleteById(id);
    }
    
    // 賞味期限が3日過ぎたものから賞味期限が2日前のものを通知対象として抽出する
    public List<FridgeItem> getItemsForNotification() {
        LocalDate today = LocalDate.now();
        LocalDate startNotify = today.minusDays(3); // 過ぎて3日以内
        LocalDate endNotify = today.plusDays(2);    // 2日後まで

        // リポジトリから対象の食材を取得する
        return fridgeItemRepository.findItemsWithUserFridgesForNotification(startNotify, endNotify);
        
		/*        List<FridgeItem> items = fridgeItemRepository.findAll();
		List<FridgeItem> result = new ArrayList<>();
		
		// フィルタリング
		for (FridgeItem item : items) {
		    LocalDate exp = item.getExpirationDate();
		    if (exp != null && !exp.isBefore(startNotify) && !exp.isAfter(endNotify)) {
		        result.add(item);
		    }
		}
		
		// ソート
		Collections.sort(result, new Comparator<FridgeItem>() {
		    @Override
		    public int compare(FridgeItem a, FridgeItem b) {
		        if (a.getExpirationDate() == null) return 1;
		        if (b.getExpirationDate() == null) return -1;
		        return a.getExpirationDate().compareTo(b.getExpirationDate());
		    }
		});
		
		return result;
		*/    }
    
    // 今日通知済みか更新する
    public void saveAll(List<FridgeItem> items) {
        fridgeItemRepository.saveAll(items);
    }
    
    // 1週間以上賞味期限が過ぎた食材を削除する
    public List<FridgeItem> getItemsExpiredOverAWeek() {
        LocalDate thresholdDate = LocalDate.now().minusWeeks(1);
        List<FridgeItem> items = fridgeItemRepository.findAll();
        List<FridgeItem> result = new ArrayList<>();
        
        for (FridgeItem item : items) {
            if (item.getExpirationDate() != null &&
                item.getExpirationDate().isBefore(thresholdDate)) {
                result.add(item);
            }
        }
        return result;
    }


}
