<template>
  <div>
    <app-header />
    <bread-crumps />
    <cardlist-container />
  </div>
</template>

<script>
import CardlistContainer from "../components/CardlistContainer";
import AppHeader from "../components/Header";
import BreadCrumps from "../components/BreadCrumps";
import {defineComponent} from "vue"

export default defineComponent({
  name: "Home",
  components: {
    CardlistContainer,
    AppHeader,
    BreadCrumps,
  },
});
</script>
