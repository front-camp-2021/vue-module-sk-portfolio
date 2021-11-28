<template>
  <form 
    class="products__search search" 
    @submit.prevent="onSubmit"
  >
    <input 
      v-model="searchValue" 
      type="text" 
      placeholder="Search" 
    >
    <button>
      <img 
        src="../../assets/img/icons/search.svg" 
        alt="search"
      >
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import {defineComponent} from "vue"

export default defineComponent({
  name: "Search",
  setup(props, { emit }) {
    const searchValue = ref("");
    const onSubmit = function () {
      emit("submit-search", searchValue.value);
    };
    return {
      onSubmit,
      searchValue,
    };
  },
});
</script>

<style lang="scss">
@import "../../assets/styles/_variables.scss"; 
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
    background-color: $white;
    border-radius: 8px;
  }
}
</style>
