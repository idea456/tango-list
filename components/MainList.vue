<template>
  <div>
    <v-alert type="error" :value="error" dismissible>{{
      this.errorMessage
    }}</v-alert>
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

      <v-col cols="12">
        <v-btn v-if="this.words.length !== 0" @click="saveAsTextFile"
          >Save as Text file</v-btn
        >
        <v-btn
          style="margin-left: 20px"
          v-if="this.words.length !== 0"
          @click="saveAsANKI"
          >Save as ANKI</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
import { table, getBorderCharacters } from "table";
import AnkiExport from "anki-apkg-export";

export default {
  name: "MainList",
  data() {
    return {
      words: [],
      loading: false,
      error: false,
      errorMessage: ""
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
    },
    saveAsANKI() {
      const apkg = new AnkiExport("vocabulary list");
      this.words.map(word =>
        apkg.addCard(`${word.title} (${word.reading})`, word.meaning)
      );
      apkg.save().then(zip => {
        saveAs(zip, "vocabulary list.apkg");
      });
    },
    saveAsTextFile() {
      let texts = [];
      this.words.map(word =>
        texts.push([word.title, word.reading, word.meaning])
      );

      let output = table(texts, {
        border: getBorderCharacters(`void`),
        drawHorizontalLine: () => {
          return false;
        }
      });

      let blob = new Blob([output], {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(blob, "vocabulary list.txt");
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
            this.errorMessage = "Could not find word in Jisho.org";
          } else {
            this.addWord(res.data.data[0]);
          }
        })
        .catch(err => {
          if (err.message === "Network Error") {
            this.error = true;
            this.loading = false;
            this.errorMessage =
              "No internet found, please check your internet connection";
          }
        });
    }
  }
};
</script>

<style scoped></style>
