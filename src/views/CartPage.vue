<template>
  <div>
    <router-link 
      class="btn btn--only-img btn--violet btn--large" 
      to="/products"
    >
      GO TO HOME
    </router-link>

    <cardlist
      :products="cart"
      @add-to-cart="addToCart($event)"
      @remove-from-cart="removeFromCart($event)"
      @remove-from-wishlist="removeFromWishListInCart($event)"
      @add-to-wishlist="addToWishInCart($event)"
    />
    <pagination
      v-if="numberOfPages > 1"
      :number-of-pages="numberOfPages"
      :current-page="state.currentPage"
      @change-current-page="onChangeCurrentPage($event)"
      @go-to-prev="onChangeCurrentPage($event)"
      @go-to-next="onChangeCurrentPage($event)"
    />
  </div>
</template>

<script>
import { useCardlistContainerComposable } from "../components/CardlistContainer/CardListContainerComposable.js";
import { defineComponent, onBeforeMount, computed } from "vue";
import Cardlist from "../components/Cardlist";
import Pagination from "../components/Pagination";

export default defineComponent({
  name: "CartPage",
  components: {
    Cardlist,
    Pagination,
  },
  setup() {
    onBeforeMount(() => {
      getCart();
    });

    const numberOfPages = computed(() => {
      return getNumberOfPages(state.cartList.length);
    });
    const cart = computed(() => {
      return setCurrentPageProducts(state.cartList);
    });
    const removeFromWishListInCart = function ($event) {
      removeFromWishList($event);
      getCart();
    };
    const addToWishInCart = function ($event) {
      addToWishlist($event);
      getCart();
    };
    const {
      state,
      removeFromCart,
      getCart,
      setCurrentPageProducts,
      getNumberOfPages,
      onChangeCurrentPage,
      addToWishlist,
      removeFromWishList,
    } = useCardlistContainerComposable();
    return {
      addToWishInCart,
      removeFromWishList,
      removeFromWishListInCart,
      removeFromCart,
      numberOfPages,
      getCart,
      state,
      cart,
      setCurrentPageProducts,
      getNumberOfPages,
      onChangeCurrentPage,
      addToWishlist,
    };
  },
});
</script>
