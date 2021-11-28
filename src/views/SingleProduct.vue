<template>
  <div class="container">
    <router-link 
      :to="`/`" 
      class="btn btn--large btn--violet btn--only-img"
    >
      GO TO HOME
    </router-link>
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
                src="../assets/img/icons/star.svg" 
                alt="rating-star" 
              >
            </div>
            <div class="product-card__price">
              ${{ card.price }}
            </div>
          </div>
          <a class="product-card__description">
            <h3>{{ card.title }}</h3>
            <p>description</p>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "SingleProduct",
  components: {},
  setup() {
    const route = useRoute();
    const card = ref({});
    onBeforeMount(() => {
      axios
        .get(`http://localhost:3001/products/?id=${route.params.id}`)
        .then((res) => (card.value = res.data[0]));
    });
    return {
      route,
      card,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  padding: 3rem;
  box-sizing: border-box;
  max-height: 100vh;
  @media screen and (max-width: 576px) {
    padding: 2rem;
  }
}
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(00, 00, 00, 0.1352);
  background-color: #fff;
  box-sizing: border-box;
  margin: 2rem auto 0 auto;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
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

  // .product-card__rating
  &__rating {
    padding: 0.6rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 6.4rem;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #6f64f8;

    span {
      color: #fff;
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
    width: 100%;
    justify-content: center;

    img {
      width: 50%;
      object-fit: contain;
      @media screen and (max-width: 576px) {
        width: 100%;
      }
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
