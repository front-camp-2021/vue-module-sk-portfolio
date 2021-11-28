<template>
  <aside class="sidebar products-list__sidebar">
    <div class="sidebar__head">
      <h3>Filters</h3>
      <button class="btn btn--only-img btn--white-bg">
        <img 
          src="../../assets/img/icons/arrows-left.svg" 
          alt="close" 
        >
      </button>
    </div>
    <Slider 
      v-model="price" 
      :min="0" 
      :max="100000" 
      :format="priceFormat" 
      @change="onChangePrice" 
    />
    <Slider
      v-model="rating"
      :min="0"
      :max="5"
      :step="0.25"
      :format="ratingFormat"
      @change="onChangeRating"
    />
    <filterlist
      :categories="categories"
      :brands="brands"
      :active-brands="activeBrands"
      :active-categories="activeCategories"
      @toggle-active="onToggleActive"
    />
    <button 
      class="btn btn--large-font btn--violet btn--full-width" 
      @click="onResetAllInputs"
    >
      CLEAR ALL FILTERS
    </button>
  </aside>
</template>

<script>
import { defineComponent, onBeforeMount, ref, computed } from "vue";
import Filterlist from "./Filterlist.vue";
import Slider from "@vueform/slider";
import axios from "axios";

export default defineComponent({
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

  setup(props, { emit }) {
    onBeforeMount(() => {
      getFiledsValues();
    });
    const categoriesResponse = ref([]);
    const brandsResponse = ref([]);
    const categoriesChecked = ref([]);
    const brandsChecked = ref([]);
    const price = ref([0, 100000]);
    const rating = ref([0, 5]);
    const priceFormat = {
      prefix: "$",
      decimals: 0,
    };
    const ratingFormat = {
      decimals: 2,
    };
    const onResetAllInputs = function (e) {
      emit("reset-all-inputs", e);
      brandsChecked.value = [];
      categoriesChecked.value = [];
      price.value = [0, 100000];
      rating.value = [0, 5];
    };
    const onToggleActive = function (e) {
      switch (e.type) {
        case "brand":
          e.checked
            ? brandsChecked.value.push(e.field)
            : (brandsChecked.value = brandsChecked.value.filter((brand) => brand !== e.field));
          break;
        case "category":
          e.checked
            ? categoriesChecked.value.push(e.field)
            : (categoriesChecked.value = categoriesChecked.value.filter(
                (category) => category !== e.field
              ));
          break;
      }
      emit("toggle-active", e);
    };
    const onChangePrice = function (e) {
      emit("price-range-update", e);
    };
    const onChangeRating = function (e) {
      emit("rating-range-update", e);
    };
    const getFiledsValues = function () {
      axios
        .get("http://localhost:3001/categories")
        .then((res) => (categoriesResponse.value = res.data));
      axios.get("http://localhost:3001/brands").then((res) => (brandsResponse.value = res.data));
    };
    const brands = computed(() => {
      return brandsResponse.value.map((brand) => {
        const isChecked = brandsChecked.value.some((brandChecked) => brandChecked === brand);
        const field = isChecked
          ? {
              field: brand,
              type: "brand",
              checked: true,
            }
          : {
              field: brand,
              type: "brand",
              checked: false,
            };
        return field;
      });
    });
    const categories = computed(() => {
      return categoriesResponse.value.map((category) => {
        const isChecked = categoriesChecked.value.some(
          (categoryChecked) => categoryChecked === category
        );
        const field = isChecked
          ? {
              field: category,
              type: "category",
              checked: true,
            }
          : {
              field: category,
              type: "category",
              checked: false,
            };
        return field;
      });
    });
    return {
      rating,
      price,
      priceFormat,
      ratingFormat,
      onToggleActive,
      onChangeRating,
      onChangePrice,
      categories,
      brands,
      getFiledsValues,
      onResetAllInputs,
    };
  },
});
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
.slider-tooltip {
  font-size: 1.4rem;
  font-weight: 500;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.05rem;
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
    margin-bottom: 1.2rem;
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
