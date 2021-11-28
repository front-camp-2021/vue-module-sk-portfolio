<template>
  <header class="header">
    <div class="container">
      <router-link 
        to="/"
        class="header__logo"
      >
        <img 
          src="../../assets/img/logo/logo.png" 
          alt="logo"
        >
        <strong> Online Store </strong>
      </router-link>
    </div>
  </header>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "AppHeader",
});
</script>

<style lang="scss">
.header {
  padding: 2.7rem 0;
  // .header__logo
  &__logo {
    color: #7e72f2;
    font-size: 4.8rem;
    line-height: 1.3;
    display: flex;
    align-items: center;
    @media screen and (max-width: 720px) {
      font-size: 3.2rem;
    }
    img {
      max-width: 9.1rem;
      width: 100%;
      margin-right: 2.2rem;
      @media screen and (max-width: 720px) {
        max-width: 7rem;
      }
    }
  }
}
</style>
