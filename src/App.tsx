
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ComingSoonPage from "@/pages/ComingSoonPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
