<template>
  <section class="not-found">
    <router-link 
      to="/"
      class="btn btn--large"
    > 
      Back to home page 
    </router-link>
    <div class="not-found__bg">
      <img 
        src="../assets/img/not-found.jpg" 
        alt="error"
      >
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
});
</script>
<style lang="scss">
@import "../assets/styles/_variables.scss"; 
.not-found {
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 5;
  padding: 4rem;
  box-sizing: border-box;
  .btn {
    color: $black;
    display: inline-flex;
  }
  //.not-found
  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
