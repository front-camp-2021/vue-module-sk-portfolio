<template>
  <label 
    class="field field--checkbox sidebar__field" 
    @click="toggleActive"
  >
    <input 
      type="checkbox" 
      :checked="checked" 
      disabled 
    >
    <span class="field__checkbox-substitute" /> 
    <span class="field__info">
      <span class="field__name">{{ field }}</span>
    </span>
  </label>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "Field",
  props: {
    type: {
      type: String,
      default: "",
    },
    field: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const toggleActive = function () {
      emit("toggle-active", {
        type: props.type,
        field: props.field,
        checked: !props.checked,
      });
    };
    return {
      toggleActive,
    };
  },
});
</script>

<style lang="scss">
@import "../../assets/styles/_variables.scss"; 
.field {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  input[type="radio"],
  input[type="checkbox"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
  }

  input:checked + .field__radio-substitute {
    border: 1px solid $violet;
  }

  input:checked + .field__radio-substitute,
  input:checked + .field__checkbox-substitute {
    background-color: $violet;
  }
  // .field__info
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  // .field__name
  &__name {
    margin-left: 1.2rem;
    font-size: 1.6rem;
    line-height: 2;
    font-weight: 300;
    color: #2c2c2c;
  }

  // .field--checkbox
  &--checkbox {
    .field__name {
      margin-right: 0.8rem;
    }
  }

  //  .field__value
  &__value {
    font-size: 1.4rem;
    line-height: 3.2rem;
    color: #2c2c2c;
  }
  //.field__checkbox-substitute
  //.field__radio-substitute
  &__checkbox-substitute,
  &__radio-substitute {
    display: block;
    width: 1.7rem;
    height: 1.5rem;
    border: 1px solid #979797;
    background-color: transparent;
  }

  // .field__radio-substitute
  &__radio-substitute {
    border-radius: 50%;
  }
}
</style>
