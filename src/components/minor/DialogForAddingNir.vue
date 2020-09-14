<template>
  <div>
    <v-btn
      x-small
      class="ml-2 mb-1"
      color="primary"
      outlined
      @click.stop="dialog = true"
    >
      добаваить работу
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-text>
          <v-tabs grow class="pt-2">
            <v-tab>nir 1</v-tab>
            <v-tab>nir 2</v-tab>

            <v-tab-item>
              <v-list>
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(item, i) in nir"
                    :key="i"
                  >
                    <v-list-item-content>
                      <div style="display: flex; align-items: center">
                        <v-checkbox
                          v-model="checkboxesNir[i]"
                          @click="modList(item)"
                          class="ml-2 mr-2"
                          dense
                        ></v-checkbox>
                        {{ item.text }}
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
            <v-tab-item>
              <v-list>
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(item, i) in okr"
                    :key="i"
                  >
                    <v-list-item-content >
                      <div style="display: flex; align-items: center">
                        <v-checkbox
                          v-model="checkboxesOkr[i]"
                          @click="modList(item)"
                          class="ml-2 mr-2"
                          dense
                        ></v-checkbox>
                        {{ item.text }}
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogForAddingNir',
  data() {
    return {
      dialog: false,
      items: [],
    };
  },
  props: {
    fullListNir: Array,
    listSelectedNir: Array,
    stageIndex: Number,
    addList: Function,
  },
  computed: {
    nir() {
      return this.fullListNir.filter((el) => el.type === 'nir1');
    },
    okr() {
      return this.fullListNir.filter((el) => el.type === 'nir2');
    },
    checkboxesNir() {
      return this.nir
        .map((el) => this.listSelectedNir.find((selected) => selected.id === el.id));
    },
    checkboxesOkr() {
      return this.okr
        .map((el) => this.listSelectedNir.find((selected) => selected.id === el.id));
    },
  },
  methods: {
    modList(item) {
      const index = this.listSelectedNir.findIndex((el) => el.id === item.id);
      if (index >= 0) {
        this.listSelectedNir.splice(index, 1);
      } else {
        this.listSelectedNir.push(item);
      }
    },
  },
};
</script>

<style scoped>

</style>
