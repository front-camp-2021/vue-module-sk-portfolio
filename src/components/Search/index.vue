<template>
  <form class="products__search search" @submit.prevent="onSubmit">
    <input type="text" placeholder="Search" v-model="searchValue">
    <button>
      <img src="../../assets/img/icons/search.svg" alt="search">
    </button>
  </form>
</template>

<script>
export default {
  name: "Search",
  components: {},

  props: {},
  data() {
    return {
    };
  },
  methods: {
    onSubmit(){
      this.$emit('submit-search', this.searchValue)
    }
  },
};
</script>

<style lang="scss">
.search {
  position: relative;
  box-shadow: 0px 2px 8px 0px rgba(00, 00, 00, 0.1352);
  margin-bottom: 2.8rem;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2rem;
    width: 1.6rem;
    height: 2rem;
  }
  input {
    box-sizing: border-box;
    padding: 1.7rem 3.8rem 1.7rem 3.2rem;
    width: 100%;
    height: 6.2rem;
    background-color: #fff;
    border-radius: 8px;
  }
}
</style>
