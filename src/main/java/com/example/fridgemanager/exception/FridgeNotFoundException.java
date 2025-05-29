package com.example.fridgemanager.exception;

public class FridgeNotFoundException extends RuntimeException {

    public FridgeNotFoundException(String message) {
        super(message);
    }
}
