<template>
  <div class="container">
    <ul class="products-list__bread-cramps bread-cramps">
      <li class="bread-cramps__item">
        <a 
          href="#" 
          class="bread-cramps__link"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1 6.25L8.61984 1L16.2397 6.25V14.5C16.2397 15.3284 15.4816 16 14.5464 16H2.6933C1.75811 16 1 15.3284 1 14.5V6.25Z"
              stroke="#7E72F2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.68909 16V8H11.5505V16"
              stroke="#7E72F2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </li>
      <li class="bread-cramps__item">
        <a 
          href="#" 
          class="bread-cramps__link"
        > 
          eCommerce 
        </a>
      </li>
      <li class="bread-cramps__item">
        <a 
          href="#" 
          class="bread-cramps__link"
        > 
          Electronics 
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "BreadCrumps",
});
</script>

<style lang="scss">
@import "../../assets/styles/_variables.scss"; 
.bread-cramps {
  display: flex;
  align-items: center;
  // .bread-cramps__item
  &__item {
    padding-right: 2.8rem;
    margin-right: 1.2rem;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      height: 0.8rem;
      width: 1.2rem;
      background-image: url(../../assets/img/icons/arrows-right.svg);
      background-repeat: no-repeat;
      background-size: contain;
    }
    &:last-of-type {
      margin-right: 0;
      padding-right: 0;
      .bread-cramps__link {
        color: $black;
      }
      .bread-cramps__link svg path {
        stroke: $black;
      }
      &:after {
        display: none;
      }
    }
  }
  // .bread-cramps__link
  &__link {
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: $violet;
  }
}
</style>
