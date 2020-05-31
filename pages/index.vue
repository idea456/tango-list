<template>
  <v-container>
    <v-alert type="error" dismissible="">I'm an error alert.</v-alert>
    <MainList style="margin-top: 20px" />
  </v-container>
</template>

<script>
import MainList from "../components/MainList";

export default {
  components: {
    MainList
  }
};
</script>
