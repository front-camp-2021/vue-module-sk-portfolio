<template>
  <div>
    <app-header />
    <bread-crumps />
    <cardlist-container />
  </div>
</template>

<script>
// @ is an alias to /src
import CardlistContainer from "../components/CardlistContainer";
import AppHeader from "../components/Header";
import BreadCrumps from "../components/BreadCrumps"

export default {
  name: "Home",
  components: {
    CardlistContainer,
    AppHeader,
    BreadCrumps
  },
};
</script>
