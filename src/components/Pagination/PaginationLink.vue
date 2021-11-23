<template>
  <li class="pagination__item">
    <a href="#" class="pagination__link" :class="{ 'pagination__link--current': pageNumber === currentPage }" @click="setCurrentPage"></a>
  </li>
</template>

<script>
export default {
  name: "PaginationLink",
  components: {},

  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  methods: {
    setCurrentPage() {
      this.$emit("change-current-page", this.pageNumber);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  // .pagination__item
  &__item {
    width: 3rem;
    height: 100%;
    margin-right: 1rem;
    @media screen and (max-width: 720px) {
      width: 1.2rem;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  // .pagination__link
  &__link {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;

    &:after,
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &:before {
      counter-increment: page;
      content: counter(page);
      font-size: 1.8rem;
      color: #2c2c2c;

      @media screen and (max-width: 720px) {
        font-size: 1.4rem;
      }
    }

    &--current {
      position: relative;
      z-index: 5;

      &:after {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        background-color: #6f64f8;
        z-index: -1;
        @media screen and (max-width: 720px) {
          width: 2.8rem;
          height: 2.8rem;
        }
      }

      &:before {
        color: #fff;
      }
    }
  }
}
</style>
