<template>
  <nav class="products-list__pagination pagination">
    <button class="pagination__btn pagination__btn--left" @click="goToPrevPage">
      <img src="../../assets/img/icons/arrow-left.svg" alt="prev" />
    </button>

    <ul class="pagination__list">
      <pagination-link
        v-for="page in numberOfPages"
        :key="page"
        :currentPage="currentPage"
        :pageNumber="page"
        @change-current-page="onChangeCurrentPage"
      ></pagination-link>
    </ul>
    <button class="pagination__btn pagination__btn--right" @click="goToNextPage">
      <img src="../../assets/img/icons/arrow-left.svg" alt="prev" />
    </button>
  </nav>
</template>

<script>
import PaginationLink from "./PaginationLink.vue";

export default {
  name: "Pagination",
  components: {
    PaginationLink,
  },
  methods:{
    goToPrevPage(){
      const prevPage = this.currentPage === 1 ? 1 : this.currentPage - 1
      this.$emit('go-to-prev', prevPage)
    },
     goToNextPage(){
      const nextPage = this.currentPage === this.numberOfPages ? 1 : this.currentPage + 1
      this.$emit('go-to-next', nextPage)
    },
    onChangeCurrentPage(e){
      this.$emit('change-current-page', e)
    }
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
  data() {
    return {};
  },
};
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
