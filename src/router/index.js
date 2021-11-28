import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import WishlistPage from "../views/WishlistPage.vue";
import CartPage from "../views/CartPage.vue";
import SingleProduct from "../views/SingleProduct.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products/:id",
    name: "SingleProduct",
    component: SingleProduct,
  },
  {
    path: "/products/wishlist",
    name: "WishlistPage",
    component: WishlistPage,
  },
  {
    path: "/products/cart",
    name: "CartPage",
    component: CartPage,
  },
  {
    path: "/:patchMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
