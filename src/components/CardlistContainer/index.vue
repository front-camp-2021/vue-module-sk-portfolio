<template>
  <main>
    <section class="products-list">
      <div class="container">
        <div class="products-list__inner">
          <sidebar
            :active-brands="state.activeBrands"
            :active-categories="state.activeCategories"
            @toggle-active="onToggleActive($event)"
            @price-range-update="updatePriceRange($event)"
            @rating-range-update="updateRatingRange($event)"
            @reset-all-inputs="reset($event)"
          />
          <div class="products products-list__main">
            <div class="products__search-res">
              <p>{{ state.productsFromRange.length }} results found</p>
              <div class="products__btns">
                <router-link 
                  class="btn btn--only-img btn--violet btn--router" 
                  to="/wishlist"
                >
                  <img 
                    src="../../assets/img/icons/white-heart.svg" 
                    alt="heart"
                  >
                </router-link>
                <router-link 
                  class="btn btn--only-img btn--violet btn--router" 
                  to="/cart"
                >
                  <img 
                    src="../../assets/img/icons/bag.svg" 
                    alt="cart"
                  >
                </router-link>
              </div>
            </div>
            <search @submit-search="onSubmitSearch($event)" />
            <cardlist
              :products="products"
              @add-to-wishlist="addToWishlist($event)"
              @remove-from-wishlist="removeFromWishList($event)"
              @add-to-cart="addToCart($event)"
              @remove-from-cart="removeFromCart($event)"
            />
          </div>
        </div>
        <pagination
          v-if="numberOfPages > 1"
          :number-of-pages="numberOfPages"
          :current-page="state.currentPage"
          @change-current-page="onChangeCurrentPage($event)"
          @go-to-prev="onChangeCurrentPage($event)"
          @go-to-next="onChangeCurrentPage($event)"
        />
      </div>
    </section>
  </main>
</template>

<script>
import Cardlist from "../Cardlist";
import Sidebar from "../Sidebar";
import Search from "../Search";
import Pagination from "../Pagination";
import {
  defineComponent,
  onUpdated,
  computed,
} from "@vue/runtime-core";
import { useCardlistContainerComposable } from "./CardListContainerComposable.js";

export default defineComponent({
  name: "CardListContainer",
  components: {
    Cardlist,
    Pagination,
    Search,
    Sidebar,
  },

  setup() {
    onUpdated(() => {
      getNumberOfPages(state.productsFromRange.length);
    });

    const numberOfPages = computed(() => {
      return getNumberOfPages(state.productsFromRange.length);
    });
    const products = computed(() => {
      return setWishlist(setCurrentPageProducts(state.productsFromRange));
    });
    const reset = function () {
      resetAllInputs();
    };
    const {
      state,
      onToggleActive,
      onSubmitSearch,
      updateRatingRange,
      updatePriceRange,
      onChangeCurrentPage,
      getNumberOfPages,
      setCurrentPageProducts,
      addToWishlist,
      removeFromWishList,
      setWishlist,
      addToCart,
      resetAllInputs,
    } = useCardlistContainerComposable();
    return {
      state,
      reset,
      onToggleActive,
      getNumberOfPages,
      onSubmitSearch,
      updateRatingRange,
      updatePriceRange,
      onChangeCurrentPage,
      setCurrentPageProducts,
      numberOfPages,
      products,
      addToCart,
      addToWishlist,
      removeFromWishList,
      setWishlist,
      resetAllInputs,
    };
  },
});
</script>

<style lang="scss">
.products-list {
  .btn--router {
    margin-left: 2.4rem;
    &:first-of-type {
      margin-left: 0;
    }
  }
  // .products-list__bread-cramps
  &__bread-cramps {
    margin-bottom: 4.4rem;
  }
  // .products-list__pagination
  &__pagination {
    margin: 4rem auto 0 auto;
  }
  // .products-list__inner
  &__inner {
    display: grid;
    grid-template-columns: 29% 69%;
    gap: 2.5rem;

    @media screen and (max-width: 1200px) {
      gap: 1.6rem;
    }
    @media screen and (max-width: 720px) {
      grid-template-columns: 100%;
    }
  }
}
.products__search-res {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.8rem;
  p {
    font-size: 1.8rem;
    line-height: 2.1rem;
    color: #2c2c2c;
  }
}
.products__btns {
  display: flex;
}
</style>
