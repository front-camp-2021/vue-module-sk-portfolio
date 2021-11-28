<template>
  <article class="products__item product-card product-card--with-rating">
    <div class="product-card__main">
      <div class="product-card__img">
        <img 
          :src="card.images[0]" 
          alt="product" 
        >
      </div>
      <div class="product-card__info">
        <div class="product-card__wr">
          <div class="product-card__rating">
            <span> {{ card.rating }} </span>
            <img 
              src="../../assets/img/icons/star.svg" 
              alt="rating-star"
            >
          </div>
          <div class="product-card__price">
            ${{ card.price }}
          </div>
        </div>
        <router-link 
          :to="`/products/${card.id}`" 
          class="product-card__description"
        >
          <h3>{{ card.title }}</h3>

          <p>description</p>
        </router-link>
      </div>
    </div>
    <div class="product-card__btns">
      <button 
        v-if="!card.isWished" 
        class="product-card__btn btn" 
        @click="addToWishList"
      >
        <img 
          src="../../assets/img/icons/heart.svg" 
          alt="heart" 
        >
        <span>WISHLIST</span>
      </button>
      <button 
        v-else 
        class="product-card__btn btn" 
        @click="removeFromWishList"
      >
        <img 
          src="../../assets/img/icons/heart-painted.svg" 
          alt="heart"
        >
        <span>WISHLIST</span>
      </button>
      <button 
        v-if="!card.isCart" 
        class="product-card__btn btn btn--violet" 
        @click="addToCart"
      >
        <img 
          src="../../assets/img/icons/bag.svg" 
          alt="bag" 
        >
        <span> ADD TO CARD </span>
      </button>
      <button 
        v-else 
        class="product-card__btn btn btn--violet" 
        @click="removeFromCart"
      >
        <img 
          src="../../assets/img/icons/delete-from-cart.svg" 
          alt="bag"
        >
        <span> REMOVE FROM CARD </span>
      </button>
    </div>
  </article>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import {defineComponent} from "vue"

export default defineComponent({
  name: "Card",
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const addToWishList = function () {
      emit("add-to-wishlist", props.card.id);
    };
    const removeFromWishList = function () {
      emit("remove-from-wishlist", props.card.id);
    };
    const addToCart = function () {
      emit("add-to-cart", { ...props.card, uuId: uuidv4() });
    };
    const removeFromCart = function () {
      emit("remove-from-cart", props.card);
    };
    return {
      addToWishList,
      removeFromWishList,
      addToCart,
      removeFromCart,
    };
  },
});
</script>

<style lang="scss">
@import "../../assets/styles/_variables.scss";  
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(00, 00, 00, 0.1352);
  background-color: $white;
  // .product-card__main
  &__main {
    padding: 3.1rem 2.49rem 2.2rem 2.372rem;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  // .product-card__price
  &__price {
    color: #2c2c2c;
    font-size: 1.8rem;
    line-height: 2.1rem;
  }

  // .product-card__btn
  &__btn {
    &:first-of-type {
      border-radius: 0 0 0 8px;
      @media screen and (max-width: 1200px) {
        border-radius: 0;
      }
    }

    &:last-of-type {
      border-radius: 0 0 8px 0;
      @media screen and (max-width: 1200px) {
        border-radius: 0 0 8px 8px;
      }
    }
  }

  // .product-card__btns
  &__btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media screen and (max-width: 1200px) {
      grid-template-columns: 100%;
    }
  }

  // .product-card__description
  &__description {
    h3 {
      color: #2c2c2c;
      line-height: 1.9rem;
      font-size: 1.6rem;
      margin-bottom: 0.3rem;
      font-weight: 400;
    }

    p {
      font-weight: 300;
      font-size: 1.2rem;
      line-height: 1.4rem;
      color: #2c2c2c;
    }
  }

  // .product-card__rating
  &__rating {
    padding: 0.6rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 6.4rem;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: $violet;

    span {
      color: $white;
      font-size: 1.4rem;
      line-height: 1.7rem;
    }
  }

  // .product-card__wr
  &__wr {
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;
    justify-content: flex-end;
  }

  // .product-card__img
  &__img {
    margin-bottom: 3.2rem;
    display: flex;
    position: relative;
    width: 100%;
    padding-bottom: 79.5%;
    justify-content: center;

    img {
      position: absolute;
      left: 50%;
      min-width: 50%;
      max-height: 100%;
      max-width: 100%;
      top: 0;
      transform: translateX(-50%);
      object-fit: contain;
    }
  }

  // .product-card--with-rating
  &--with-rating {
    .product-card__wr {
      justify-content: space-between;
    }
  }
}
</style>
