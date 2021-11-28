<template>
  <nav class="products-list__pagination pagination">
    <button
      :disabled="currentPage === 1"
      :class="{ 'pagination__btn--disable': currentPage === 1 }"
      class="pagination__btn pagination__btn--left"
      @click="goToPrevPage"
    >
      <img 
        src="../../assets/img/icons/arrow-left.svg" 
        alt="prev"
      >
    </button>

    <ul class="pagination__list">
      <pagination-link
        v-for="page in numberOfPages"
        :key="page"
        :current-page="currentPage"
        :page-number="page"
        @change-current-page="onChangeCurrentPage"
      />
    </ul>
    <button
      :disabled="currentPage === numberOfPages"
      :class="{ 'pagination__btn--disable': currentPage === numberOfPages }"
      class="pagination__btn pagination__btn--right"
      @click="goToNextPage"
    >
      <img 
        src="../../assets/img/icons/arrow-left.svg" 
        alt="prev"
      >
    </button>
  </nav>
</template>

<script>
import PaginationLink from "./PaginationLink.vue";
import {defineComponent} from "vue"

export default defineComponent({
  name: "Pagination",
  components: {
    PaginationLink,
  },
  props: {
    numberOfPages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const goToPrevPage = function (e) {
      const prevPage = props.currentPage === 1 ? 1 : props.currentPage - 1;
      emit("go-to-prev", prevPage);
    };
    const goToNextPage = function (e) {
      const nextPage =
        props.currentPage === props.numberOfPages ? props.numberOfPages : props.currentPage + 1;
      emit("go-to-next", nextPage);
    };
    const onChangeCurrentPage = function (e) {
      emit("change-current-page", e);
    };
    return {
      goToPrevPage,
      goToNextPage,
      onChangeCurrentPage,
    };
  },
});
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 720px) {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  // .pagination__btn
  &__btn {
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
    border-radius: 50%;
    background-color: #ededed;
    @media screen and (max-width: 720px) {
      width: 2.8rem;
      height: 2.8rem;
    }

    img {
      width: 0.7rem;
      height: 1.2rem;
    }
  }
  // .pagination__btn--disable
  &__btn--disable {
    opacity: 0.3;
    pointer-events: none;
  }
  // .pagination__btn--right
  &__btn--right {
    img {
      transform: rotate(180deg);
    }
  }

  // .pagination__list
  &__list {
    margin: 0 1.8rem;
    padding: 0 1.2rem;
    display: flex;
    align-items: center;
    height: 4rem;
    border-radius: 20px;
    counter-reset: page;
    background-color: #ededed;
    @media screen and (max-width: 720px) {
      height: 2.8rem;
      margin: 0 0.4rem;
    }
  }
}
</style>
