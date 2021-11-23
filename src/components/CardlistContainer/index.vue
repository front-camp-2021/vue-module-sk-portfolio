<template>
  <main>
    <section class="products-list">
      <div class="container">
        <div class="products-list__inner">
          <sidebar
            :activeBrands="activeBrands"
            :activeCategories="activeCategories"
            @toggle-active="onToggleActive"
            @price-range-update="updatePriceRange"
            @rating-range-update="updateRatingRange"
          ></sidebar>
          <div class="products products-list__main">
            <div class="products__search-res">
              <p>{{ productsFromRange.length }} results found</p>
              <div class="products__btns">
                <a class="btn btn--only-img btn--violet">
                  <img
                    src="../../assets/img/icons/white-heart.svg"
                    alt="heart"
                  />
                </a>
              </div>
            </div>
            <search @submit-search="onSubmitSearch" />
            <cardlist
              :products="onCurrentPage"
              @change-wishlist="onChangeWishlist"
            />
          </div>
        </div>
        <pagination
          :numberOfPages="numberOfPages"
          :currentPage="currentPage"
          @change-current-page="onChangeCurrentPage"
          @go-to-prev="onChangeCurrentPage"
          @go-to-next="onChangeCurrentPage"
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
import axios from "axios";

export default {
  name: "CardlistContainer",
  components: {
    Cardlist,
    Sidebar,
    Search,
    Pagination,
  },

  props: {},
  data() {
    return {
      activeCategories: [],
      activeBrands: [],
      productsUrlDefault: "http://localhost:3001/products",
      priceRange: [],
      ratingRange: [],
      productsFromRange: [],
      productsForFilter: [],
      searchValue: "",
      searchProducts: [],
      currentPage: 1,
      productsOnPage: 9,
      wishlist: [],
    };
  },
  methods: {
    onChangeWishlist(){},
    onChangeCurrentPage(e) {
      this.currentPage = e;
    },
    onSubmitSearch(e) {
      this.searchValue = e;
      this.currentPage = 1;
      this.getProducts(this.productsFiltersUrl, this.productsSearchUrl);
    },
    updatePriceRange(e) {
      this.priceRange = e;
      this.currentPage = 1;
      this.productsFromSlidersRange();
    },
    updateRatingRange(e) {
      this.ratingRange = e;
      this.currentPage = 1;
      this.productsFromSlidersRange();
    },
    productsFromRatingRange(arrLength, products) {
      const minRating = arrLength.length === 0 ? null : this.ratingRange[0];
      const maxRating = arrLength.length === 0 ? null : this.ratingRange[1];
      return products.filter(
        (product) => minRating <= product.rating && maxRating >= product.rating
      );
    },
    productsFromPriceRange(arrLength, products) {
      const minPrice = arrLength.length === 0 ? null : this.priceRange[0];
      const maxPrice = arrLength.length === 0 ? null : this.priceRange[1];
      return products.filter(
        (product) => minPrice <= product.price && maxPrice >= product.price
      );
    },
    productsFromSlidersRange() {
      const priceRangeArrLength = Object.keys(this.priceRange).length;
      const ratingRangeArrLength = Object.keys(this.ratingRange).length;
      if (priceRangeArrLength !== 0 && ratingRangeArrLength !== 0) {
        const priceRangeProducts = this.productsFromPriceRange(
          priceRangeArrLength,
          [...this.productsForFilter]
        );
        this.productsFromRange = this.productsFromRatingRange(
          ratingRangeArrLength,
          priceRangeProducts
        );
      } else if (priceRangeArrLength === 0 && ratingRangeArrLength !== 0) {
        this.productsFromRange = this.productsFromRatingRange(
          ratingRangeArrLength,
          [...this.productsForFilter]
        );
      } else if (ratingRangeArrLength === 0 && priceRangeArrLength !== 0) {
        this.productsFromRange = this.productsFromPriceRange(
          priceRangeArrLength,
          [...this.productsForFilter]
        );
      } else {
        this.productsFromRange = [...this.productsForFilter];
      }
          this.setCurrentPageProducts();
    this.getNumberOfPages();
    },
    setCurrentPageProducts() {
      this.onCurrentPage = this.productsFromRange.slice(
        this.productsOnPage * (this.currentPage - 1),
        this.productsOnPage * this.currentPage
      );
    },
    onToggleActive(e) {
      switch (e.type) {
        case "brand":
          this.activeBrands = this.onToggleActiveFields(e, this.activeBrands);
          break;
        case "category":
          this.activeCategories = this.onToggleActiveFields(
            e,
            this.activeCategories
          );
          break;
      }
      this.currentPage = 1;
      this.getProducts(this.productsFiltersUrl, this.productsSearchUrl);
    },
    onToggleActiveFields(e, activeFields) {
      let newActiveFields;
      const valid = activeFields.some((field) => field.field === e.field);
      if (valid) {
        newActiveFields = activeFields.filter(
          (field) => field.field !== e.field
        );
        return newActiveFields;
      } else {
        activeFields.push(e);
        return activeFields;
      }
    },
    getProducts(filtersUrl, searchUrl) {
      const activeCategoriesLength = Object.keys(this.activeCategories).length;
      const activeBrandsLength = Object.keys(this.activeBrands).length;
      const activeFieldsValid =
        activeCategoriesLength !== 0 || activeBrandsLength !== 0;
      if (this.searchValue.length !== 0 && activeFieldsValid) {
        this.getSearchFilteredProducts(filtersUrl, searchUrl);
      } else if (this.searchValue.length !== 0 && !activeFieldsValid) {
        this.getSearchProducts(searchUrl);
      } else if (this.searchValue.length === 0 && activeFieldsValid) {
        this.getFilteredProducts(filtersUrl);
      } else {
        this.getAllProducts(this.productsUrlDefault);
      }
    },
    getSearchProducts(searchUrl) {
      axios
        .get(searchUrl)
        .then((res) => (this.productsForFilter = res.data))
        .then((res) => (this.productsFromRange = res));
    },
    getFilteredProducts(filtersUrl) {
      axios
        .get(filtersUrl)
        .then((res) => (this.productsForFilter = res.data))
        .then((res) => (this.productsFromRange = res));
    },
    getAllProducts(url) {
      axios
        .get(url)
        .then((res) => (this.productsForFilter = res.data))
        .then((res) => (this.productsFromRange = res));
    },
    getSearchFilteredProducts(filtersUrl, searchUrl) {
      axios
        .all([axios.get(filtersUrl), axios.get(searchUrl)])
        .then(function (data) {
          const searchProducts = data[1].data;
          const productsForFilter = data[0].data;
          return productsForFilter.filter((filteredProduct) => {
            return searchProducts.some(
              (searchProduct) => searchProduct.id === filteredProduct.id
            );
          });
        })
        .then((res) => (this.productsForFilter = res))
        .then((res) => (this.productsFromRange = res));
    },
    getNumberOfPages() {
      this.numberOfPages = Math.ceil(
        this.productsFromRange.length / this.productsOnPage
      );
    },
  },
  computed: {
    brandsPartUrl() {
      return this.activeBrands
        .map(
          (brand) =>
            `${brand.type}=${brand.field.toLowerCase().replace(" ", "_")}`
        )
        .join("&");
    },
    categoriesPartUrl() {
      return this.activeCategories
        .map(
          (category) =>
            `${category.type}=${category.field.toLowerCase().replace(" ", "_")}`
        )
        .join("&");
    },
    productsFiltersUrl() {
      return `${this.productsUrlDefault}?${this.brandsPartUrl}&${this.categoriesPartUrl}`;
    },
    productsSearchUrl() {
      return `${this.productsUrlDefault}?q=${this.searchValue}`;
    },
  },
  created() {
    this.getProducts(this.productsFiltersUrl, this.productsSearchUrl);
  },
  updated() {
    this.productsFromSlidersRange();
  },
};
</script>

<style lang="scss">
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
