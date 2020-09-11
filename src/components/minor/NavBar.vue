<template>
  <v-card class="bar">
    <div>
      <v-card-title>{{`Калькулятор трудозатрат - ${new Date().getFullYear()}`}}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list dense nav>
          <v-list-item-group color="primary">
            <div v-for="(item, i) in items" :key="i">
              <v-list-item :to="item.to" v-model="item.active" v-if="!item.items[0]">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-group v-else no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(subItem, j) in item.items"
                  :key="j"
                  :to="subItem.to"
                >
                  <v-list-item-content>
                    <v-list-item-title >{{ subItem.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </div>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </div>
    <div>
      <v-divider></v-divider>
      <v-row>
        <v-col style="display: flex; align-items: center" cols="10">
          <div class="text--secondary">
            <v-icon class="ml-4 mr-2">mdi-tag-outline</v-icon>
            v1.0
          </div>
        </v-col>
        <v-col cols="2">
          <v-btn class="mr-4" icon @click="changeTheme">
            <v-icon v-if="theme">mdi-brightness-4</v-icon>
            <v-icon v-else>mdi-brightness-7</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      item: 0,
      active: 5,
      items: [
        {
          title: 'Список НИР',
          active: false,
          to: '/list-nir',
          items: [],
        },
        {
          title: 'Список ОКР',
          active: false,
          to: '/list-okr',
          items: [],
        },
        {
          title: 'Справочники НИР',
          active: true,
          items: [
            { title: 'Свойства новизны НИР', to: '/2' },
            { title: 'Маштабы НИР', to: '/3' },
            { title: 'Коэффициенты новизны НИР', to: '/4' },
          ],
        },
        {
          title: 'Справочники ОКР',
          active: false,
          items: [
            { title: 'Свойства новизны ОКР', to: '/nir-innovation-properties' },
            { title: 'Коэффициенты новизны ОКР', to: '/5' },
            { title: 'Компоновки Устройств', to: '/6' },
            { title: 'Количественные диапозоны', to: '/7' },
            { title: 'Коэффициенты сложности устройств', to: '/8' },
          ],
        },
      ],
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      // localStorage.setItem('theme', JSON.stringify(dark));
    },
  },
};
</script>

<style scoped>
.bar {
  height: 100vh;
  width: 380px;
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
}
.footer {}
</style>
