package com.example.fridgemanager.exception;

/**
 * ユーザーが見つからない場合にスローされる例外
 */
public class UserNotFoundException extends RuntimeException {
    
    /**
     * メッセージ付きで例外を生成するコンストラクタ
     * @param message エラーメッセージ
     */
    public UserNotFoundException(String message) {
        super(message);
    }
}
