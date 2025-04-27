package com.example.fridgemanager.controller;


import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.fridgemanager.entity.FridgeItem;
import com.example.fridgemanager.repository.FridgeItemRepository;
import com.example.fridgemanager.service.FridgeItemService;


@SpringBootTest
class FridgeItemControllerTest {

    @Autowired
    private FridgeItemRepository fridgeItemRepository;

    private MockMvc mockMvc;

    @MockBean
    private FridgeItemService fridgeItemService;  // モックサービス

    @BeforeEach
    void setUp() {
        FridgeItemController controller = new FridgeItemController(fridgeItemService); // モックサービスを渡す
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }


    @Test
    void getFridgeItemById_existingId_returnOk() throws Exception {
        FridgeItem fridgeItem = new FridgeItem();
        fridgeItem.setId(1L);
        fridgeItem.setName("Milk");
        fridgeItem.setExpirationDate(LocalDate.of(2025, 5, 1));

        when(fridgeItemRepository.findById(1L)).thenReturn(Optional.of(fridgeItem));

        mockMvc.perform(get("/fridge-items/1"))
               .andExpect(status().isOk());
    }

    @Test
    void getFridgeItemById_nonExistingId_returnNotFound() throws Exception {
        when(fridgeItemRepository.findById(2L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/fridge-items/2"))
               .andExpect(status().isNotFound());
    }
}
