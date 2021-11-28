<template>
  <div> 
    <router-link 
      class="btn btn--only-img btn--violet btn--large" 
      to="/"
    >
      GO TO HOME
    </router-link>
    <router-link 
      class="btn btn--only-img btn--violet btn--large"
      to="/products/cart"
    >
      GO TO CART
    </router-link>
    <cardlist
      :products="wishlist"
      @add-to-wishlist="addToWishlist($event)"
      @remove-from-wishlist="removeFromWishList($event)"
      @add-to-cart="addToCart($event)"
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
  name: "WishlistPage",
  components: {
    Cardlist,
    Pagination,
  },
  setup() {
    onBeforeMount(() => {
      getWislListProduct(state.fullProductList);
      getNumberOfPages(state.productsFromRange.length);
    });
    const numberOfPages = computed(() => {
      return getNumberOfPages(getWislListProduct(state.fullProductList).length);
    });
    const wishlist = computed(() => {
      return setWishlist(setCurrentPageProducts(state.wishlistProducts));
    });
    const {
      state,
      addToCart,
      getProducts,
      setWishlist,
      addToWishlist,
      removeFromWishList,
      getNumberOfPages,
      setCurrentPageProducts,
      filterIsWishedProducts,
      onChangeCurrentPage,
      getWislListProduct,
    } = useCardlistContainerComposable();
    return {
      wishlist,
      numberOfPages,
      getProducts,
      addToCart,
      setWishlist,
      filterIsWishedProducts,
      setCurrentPageProducts,
      getNumberOfPages,
      addToWishlist,
      removeFromWishList,
      onChangeCurrentPage,
      state,
      getWislListProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn {
  margin: 0 3rem 3rem 0;
  &:last-of-type {
    margin: 0;
  }
}
</style>
