<template>
  <div>
    <v-btn
      x-small
      class="ml-2 mb-1"
      color="primary"
      outlined
      @click.stop="dialog = true"
    >
      добавить группу работ
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-text>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in groups"
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
  name: 'DialogAddGroups',
  props: {
    groups: Array,
  },
};
</script>

<style scoped>

</style>
