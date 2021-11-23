<template>
  <aside class="sidebar products-list__sidebar">
    <div class="sidebar__head">
      <h3>Filters</h3>
      <button class="btn btn--only-img btn--white-bg">
        <img src="../../assets/img/icons/arrows-left.svg" alt="close" />
      </button>
    </div>
    <Slider v-model="price" :min="0" :max="100000" :format="priceFormat" @input="onChangePrice"/>
    <Slider
      v-model="rating"
      :min="0"
      :max="5"
      :step="0.25"
      :format="ratingFormat"
      @input="onChangeRating"
    />
    <filterlist
      :categories="categories"
      :brands="brands"
      :activeBrands="activeBrands"
      :activeCategories="activeCategories"
      @toggle-active="onToggleActive"
    />
    <button class="btn btn--large-font btn--violet btn--full-width">
      CLEAR ALL FILTERS
    </button>
  </aside>
</template>

<script>
import Filterlist from "./Filterlist.vue";
import Slider from "@vueform/slider";
import axios from 'axios';

export default {
  name: "Sidebar",
  components: {
    Filterlist,
    Slider,
  },

  props: {
    activeCategories: {
      type: Array,
      default: () => [],
    },
    activeBrands: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    price: [0, 100000],
    rating: [0, 5],
    priceFormat: {
      prefix: "$",
      decimals: 0,
    },
    ratingFormat: {
      decimals: 2,
    },
    categoriesResponse: [],
    brandsResponse: [],
    categoriesBaseUrl: 'http://localhost:3001/categories',
    brandsBaseUrl: 'http://localhost:3001/brands',
  }),

  computed: {
    brands() {
      return this.brandsResponse.map((brand) => ({ field: brand, type: "brand" }));
    },
    categories() {
      return this.categoriesResponse.map((category) => ({
        field: category,
        type: "category",
      }));
    },
  },
  created() {
    axios.get(this.categoriesBaseUrl)
    .then(res => this.categoriesResponse = res.data)
     axios.get(this.brandsBaseUrl)
    .then(res => this.brandsResponse = res.data)
  },
  methods: {
    onToggleActive(e) {
    
      this.$emit("toggle-active", e);
    },
    onChangePrice(e){
      this.$emit('price-range-update', e)
    },
    onChangeRating(e){
       this.$emit('rating-range-update', e)
    }
  },
};
</script>


<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss" >
.slider-tooltip{
  font-size: 1.4rem;
  font-weight: 500;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: .05rem;
}
.slider-target {
  margin: 4rem 2.8rem 2rem 2.8rem;
}
.slider-connect {
  background: #6f64f8;
}
.slider-tooltip {
  background: #6f64f8;
  border: #6f64f8;
  font-family: "Montserrat", sans-serif;
}
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 720px) {
    display: none;
  }

  h3 {
    color: #2c2c2c;
    margin-bottom: 2rem;
  }

  // .sidebar__form
  &__form {
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 3.2rem 4.4rem;
    margin-bottom: 4rem;
    box-shadow: 0px 2px 8px 0px rgba(00, 00, 00, 0.1352);
    @media screen and (max-width: 1200px) {
      padding: 2rem;
    }
  }

  // .sidebar__head
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
  }

  // .sidebar__filter
  &__filter {
    padding-top: 3.6rem;
    border-top: 1px solid #d6d6d6;
    margin-bottom: 2.8rem;

    &:first-of-type {
      padding-top: 0;
      border-top: none;
    }
  }
}
</style>
