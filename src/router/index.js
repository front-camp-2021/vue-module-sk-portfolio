import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import WishlistPage from "../views/WishlistPage.vue";
import CartPage from "../views/CartPage.vue";
import SingleProduct from "../views/SingleProduct.vue";

const routes = [
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/products",
    name: "Home",
    component: Home,
  },
  {
    path: "/products/:id",
    name: "SingleProduct",
    component: SingleProduct,
  },
  {
    path: "/wishlist",
    name: "WishlistPage",
    component: WishlistPage,
  },
  {
    path: "/cart",
    name: "CartPage",
    component: CartPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
