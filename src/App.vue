<template>
  <v-app>
    <v-main :style="{background: $vuetify.theme.themes[theme].background}">
      <v-row no-gutters>
        <v-col
          cols="3"
        >
          <drawer/>
        </v-col>
        <v-col
          cols="9"
        >
          <router-view/>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from './components/minor/NavBar.vue';

export default {
  name: 'App',

  components: {
    Drawer,
  },
  computed: {
    theme() {
      console.log(this.$vuetify.theme.dark);
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">

</style>
