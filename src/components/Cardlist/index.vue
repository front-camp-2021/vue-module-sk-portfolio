<template>
  <div class="products__inner">
    <card
      v-for="product in products"
      :key="product.id"
      :card="{ ...product }"
      @add-to-wishlist="addToWishlist"
      @remove-from-wishlist="removeFromWishList"
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
    />
  </div>
</template>

<script>
import Card from "../Card/index.vue";
import {defineComponent} from "vue"

export default defineComponent({
  name: "Cardlist",
  components: {
    Card,
  },

  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const addToWishlist = function (e) {
      emit("add-to-wishlist", e);
    };
    const removeFromWishList = function (e) {
      emit("remove-from-wishlist", e);
    };
    const addToCart = function (e) {
      emit("add-to-cart", e);
    };
    const removeFromCart = function (e) {
      emit("remove-from-cart", e);
    };
    return {
      addToWishlist,
      removeFromWishList,
      addToCart,
      removeFromCart,
    };
  },
});
</script>

<style lang="scss">
.products {
  // .products__inner
  &__inner {
    display: grid;
    gap: 2.8rem;
    grid-template-columns: repeat(3, 1fr);
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.6rem;
    }

    @media screen and (max-width: 720px) {
      grid-template-columns: 100%;
    }
  }
}
.products-list {
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
</style>
