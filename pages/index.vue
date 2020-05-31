<template>
  <v-container>
    <MainList style="margin-top: 20px" />
  </v-container>
</template>

<script>
import MainList from "../components/MainList";

export default {
  components: {
    MainList
  },
  data() {
    return {
      showError: true
    };
  },
  methods: {
    setError() {
      console.log("YESSSSS");
    }
  }
};
</script>
