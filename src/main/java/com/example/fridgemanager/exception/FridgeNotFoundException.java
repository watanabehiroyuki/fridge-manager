package com.example.fridgemanager.exception;

/**
 * 指定された冷蔵庫が見つからなかった場合にスローされるカスタム例外クラス
 * - RuntimeExceptionを継承しているため、チェック例外ではない
 */
public class FridgeNotFoundException extends RuntimeException {

    public FridgeNotFoundException(String message) {
        super(message);
    }
}
