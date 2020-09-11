<template>
  <v-app>
    <v-main :style="{background: $vuetify.theme.themes[theme].background}">
      <v-row no-gutters>
        <v-col
          cols="3"
          xl="3"
          lg="3"
          md="4"
        >
          <drawer/>
        </v-col>
        <v-col
          class="pl-5"
          cols="9"
          xl="9"
          lg="9"
          md="8"
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
