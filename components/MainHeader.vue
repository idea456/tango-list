<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>📝🇯🇵 単語リスト</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-subheader>📝🇯🇵 単語リスト</v-subheader>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item @click>
          <v-list-item-content>
            <v-list-item-title
              ><a
                style="text-decoration: none; color: black; font-size: 16px"
                href="https://github.com/idea456/tango-list"
              >
                View in Github</a
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      drawer: false
    };
  }
};
</script>
