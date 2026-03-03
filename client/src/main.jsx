import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
        toastStyle={{
          background: '#231f1b',
          border: '1px solid rgba(255,193,7,0.12)',
          borderRadius: '12px',
          fontFamily: "'Inter', sans-serif"
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);
