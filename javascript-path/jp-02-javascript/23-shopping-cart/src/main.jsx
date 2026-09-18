import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import { AppLayout } from "./AppLayout.jsx";
import { Home } from "./Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<Navigate to="/home"> </Navigate>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
