import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
// import LoginPage from "./pages/LoginPage";
import ModalDetailPage from "./pages/ModalDetailPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:detailId" element={<ModalDetailPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
