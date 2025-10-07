package com.example.fridgemanager.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

/**
 * アプリ全体で発生する例外を一括で処理するためのグローバル例外ハンドラ
 * - 各Exceptionに対応するエラーレスポンスを定義
 * - @RestControllerAdviceにより、すべての@RestControllerに適用される
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 共通エラーレスポンス形式を生成
     * @param message エラーメッセージ
     * @return JSON形式のエラー情報（メッセージ＋発生時刻）
     */
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", message);
        error.put("timestamp", LocalDateTime.now().toString());
        return error;
    }

    /**
     * ユーザーが見つからなかった場合の処理
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(createErrorResponse(ex.getMessage()));
    }

    /**
     * 冷蔵庫が見つからなかった場合の処理
     */
    @ExceptionHandler(FridgeNotFoundException.class)
    public ResponseEntity<?> handleFridgeNotFound(FridgeNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(createErrorResponse(ex.getMessage()));
    }
    
    /**
     * その他のRuntimeException（IllegalArgumentExceptionなど）に対応
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createErrorResponse(ex.getMessage()));
    }

    /**
     * パラメータの型が不正なリクエストに対応（例：数字を期待しているのに文字列が渡された等）
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createErrorResponse("パラメータの型が不正です"));
    }

    /**
     * その他すべての予期しない例外に対応
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(createErrorResponse("サーバーエラー"));
    }
}
