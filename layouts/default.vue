<template>
  <v-app>
    <MainHeader />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import MainHeader from "../components/MainHeader";

export default {
  components: {
    MainHeader
  }
};
</script>
