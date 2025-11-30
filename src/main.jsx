import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import AdminLogin from "./AdminLogin.jsx";
import AdminPanel from "./AdminPanel.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </BrowserRouter>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Página principal do cliente */}
        <Route path="/" element={<App />} />

        {/* Login da dona */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Painel da dona */}
        <Route path="/painel" element={<AdminPanel />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



