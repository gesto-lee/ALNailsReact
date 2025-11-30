import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import AdminLogin from "./AdminLogin.jsx";
import AdminPanel from "./AdminPanel.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Página principal */}
        <Route path="/" element={<App />} />

        {/* Login da dona */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Painel admin */}
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
