<template>
  <div>
    <v-alert type="error" :value="error" dismissible
      >Could not find word in Jisho.org</v-alert
    >
    <v-row justify="center">
      <v-text-field
        v-model="word"
        append-icon="mdi-arrow-right"
        @keyup.enter.native="searchWord"
        @click:append="searchWord"
        label="ここで言葉を書いてください"
        outlined
      />

      <v-col v-for="(word, i) in words" :key="i" cols="12">
        <v-card>
          <div>
            <v-row>
              <v-col cols="3">
                <v-card-title v-if="word.title !== undefined">{{
                  word.title
                }}</v-card-title>
                <v-card-title v-if="word.title === undefined">{{
                  word.reading
                }}</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title v-if="word.title !== undefined">{{
                  word.reading
                }}</v-card-title>
              </v-col>
              <v-col cols="5">
                <v-card-subtitle>{{ word.meaning.join(", ") }}</v-card-subtitle>
              </v-col>
              <v-col
                class="d-flex justify-flex-end"
                cols="1"
                @click="removeWord(i)"
              >
                <v-icon>mdi-window-close</v-icon>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainList",
  data() {
    return {
      words: [],
      loading: false,
      error: false
    };
  },
  methods: {
    removeWord(index) {
      this.words = this.words.filter((word, i) => i !== index);
    },
    addWord(word) {
      this.words.push({
        title: word.japanese[0].word,
        reading: word.japanese[0].reading,
        meaning: word.senses[0].english_definitions,
        part_of_speech: word.senses[0].part_of_speech
      });
      console.log(word.japanese[0].word);
    },
    async searchWord() {
      this.loading = true;
      this.error = false;
      await axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${this.word}`
        )
        .then(res => {
          this.loading = false;
          if (res.data.data.length === 0) {
            console.log(this.error);
            this.error = true;
          } else {
            this.addWord(res.data.data[0]);
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style scoped></style>
