import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "@/components/Layout";
import LoginPage from "@/LoginPage.tsx"; // ログイン画面
import UserRegisterPage from "@/UserRegisterPage.tsx"; // ユーザー新規登録画面
import FridgeArchivePage from "@/FridgeArchivePage.tsx"; // 一覧画面
import UserSharePage from "@/UserSharePage.tsx"; // ユーザー共有画面
import FridgeDetailPage from "@/FridgeDetailPage.tsx"; // 詳細
import FridgeLayout from "@/components/FridgeLayout.tsx"; // 親ルート

import "@/styles/style.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ヘッダーなし（ログイン系） */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/fridges/:fridgeId" element={<FridgeLayout />}>
          <Route index element={<FridgeDetailPage />} />
          <Route path="share" element={<UserSharePage />} />
        </Route>

        {/* ヘッダーあり */}
        <Route element={<Layout />}>
          <Route path="/fridges" element={<FridgeArchivePage />} />
        </Route>

        {/* それ以外はログインへ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
