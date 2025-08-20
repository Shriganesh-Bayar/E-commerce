import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import MyProducts from "./pages/MyProducts";
import Cart from "./pages/Cart";
import History from "./pages/History";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import NotFound from "./pages/NotFound";

const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user")) || null; }
  catch { return null; }
};

export default function App() {
  const user = getUser();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/all-products" /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/my-products/:sellerId" element={<MyProducts />} />
          <Route path="/cart/:customerId" element={<Cart />} />
          <Route path="/history/:customerId" element={<History />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
