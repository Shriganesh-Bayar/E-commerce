import axios from "axios";
import { API_BASE } from "../config";

const api = axios.create({
    baseURL: API_BASE,
});

// Inject token if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const unwrap = (p) => p.then(r => r.data);

export const AuthAPI = {
    login: (email_id, password) =>
        unwrap(api.post("/user/login", { data: { email_id, password } })),
    register: (user_name, email_id, password) =>
        unwrap(api.post("/user/register", { data: { user_name, email_id, password } })),
};

export const ProductAPI = {
    myProducts: (seller_id) => unwrap(api.get(`/user/myProducts/${seller_id}`)),
    allProducts: (seller_id) => unwrap(api.get(`/user/allProducts/${seller_id}`)),

    addProduct: (seller_id, product_name, price, quantity, image) =>
        unwrap(api.post("/seller/add", {
            data: { user_id: seller_id, seller_id, product_name, price, quantity, image }
        })),

    updateProduct: (seller_id, product_id, newPrice, newQuantity) =>
        unwrap(api.post("/seller/updateProduct", {
            data: { user_id: seller_id, seller_id, product_id, newPrice, newQuantity }
        })),

    removeProduct: (product_id) => unwrap(api.get(`/seller/removeProduct/${product_id}`)),
};

export const CartAPI = {
    myCart: (customer_id) => unwrap(api.get(`/user/cart/${customer_id}`)),
    addToCart: (customer_id, product_id, quantity) =>
        unwrap(api.post("/customer/addCart", {
            data: { user_id: customer_id, customer_id, product_id, quantity }
        })),
    updateCartItem: (customer_id, product_id, quantity) =>
        unwrap(api.post("/customer/cartUpdate", {
            data: { user_id: customer_id, customer_id, product_id, quantity }
        })),
    removeItem: (product_id, customer_id) =>
        unwrap(api.get(`/customer/removeItem/${product_id}/${customer_id}`)),
    buyAll: (customer_id) => unwrap(api.get(`/customer/cartBuy/${customer_id}`)),
};

export const HistoryAPI = {
    myHistory: (customer_id) => unwrap(api.get(`/user/history/${customer_id}`)),
};
