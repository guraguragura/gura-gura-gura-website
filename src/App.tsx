
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ComingSoonPage from "@/pages/ComingSoonPage";

function App() {
  return (
    <>
      <Routes>
        {/* Redirect all routes to Coming Soon page */}
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="*" element={<Navigate to="/coming-soon" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
