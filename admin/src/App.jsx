import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import List from "./pages/List/List";
import BrandCategoryManager from "./pages/ManageBrandsAndCategories/page";
import Auth from "./pages/Auth/Auth";

import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { token } = useContext(AuthContext);

  const url = import.meta.env.VITE_API_URL;

  if (!token) {
    return (
      <>
        <Toaster position="top-right" richColors />
        <Auth />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <Navbar />

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="pt-1 pb-20 md:pb-6 md:ml-64">
          <div className="min-h-[calc(100vh-64px)] overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
              <Route
                path="/manage-brands-categories"
                element={<BrandCategoryManager url={url} />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;