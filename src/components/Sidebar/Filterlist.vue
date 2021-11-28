<template>
  <form class="sidebar__form">
    <div class="sidebar__filter">
      <h3>
        <strong> Categories </strong>
      </h3>
      <field
        v-for="field in categories"
        :key="field"
        :field="field.field"
        :checked="field.checked"
        :type="field.type"
        @toggle-active="onToggleActive"
      />
    </div>

    <div class="sidebar__filter">
      <h3>
        <strong> Brands </strong>
      </h3>
      <field
        v-for="field in brands"
        :key="field"
        :field="field.field"
        :checked="field.checked"
        :type="field.type"
        @toggle-active="onToggleActive"
      />
    </div>
    {{ e }}
  </form>
</template>

<script>
import Field from "./Field.vue";
import {defineComponent} from "vue"

export default defineComponent({
  name: "Filterlist",
  components: {
    Field,
  },

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    brands: {
      type: Array,
      default: () => [],
    },
    activeBrands: {
      type: Array,
      default: () => [],
    },
    activeCategories: {
      type: Array,
      default: () => [],
    },
  },
  setup(props,{emit}){
    const onToggleActive = function(e) {
      emit('toggle-active', e)
    };
    return {
      onToggleActive
    }
  },
});
</script>

<style lang="scss">
@import "../../assets/styles/_variables.scss"; 
.sidebar__form {
  height: 100%;
  background-color: $white;
  border-radius: 8px;
  padding: 3.2rem 4.4rem;
  margin-bottom: 4rem;
  box-shadow: 0px 2px 8px 0px rgba(00, 00, 00, 0.1352);
  @media screen and (max-width: 1200px) {
    padding: 2rem;
  }
}
.sidebar__filter {
  padding-top: 3.6rem;
  border-top: 1px solid #d6d6d6;
  margin-bottom: 2.8rem;

  h3 {
    color: #2c2c2c;
    margin-bottom: 2rem;
  }

  &:first-of-type {
    padding-top: 0;
    border-top: none;
  }
}
</style>
