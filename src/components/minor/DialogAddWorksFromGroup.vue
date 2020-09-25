<template>
  <div>
    <v-btn
      x-small
      color="primary"
      outlined
      @click.stop="showList()"
    >
      {{title}}
    </v-btn>

    <v-dialog
      persistent
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title>{{titleCard}}</v-card-title>
        <v-card-text class="card-text">
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in NIR_GROUP_LABOR_LIST"
                :key="i"
              >
                <v-list-item-content style="padding: 0">
                  <div style="display: flex; align-items: center">
                    <v-checkbox
                      v-model="checkboxes[i]"
                      @click="modList(item)"
                      class="ml-2 mr-2"
                      dense
                    ></v-checkbox>
                    {{ item.name }}
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
            @click="saveList"
          >
            Далее
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DialogAddWorksGroup',
  data() {
    return {
      dialog: false,
      items: [],
    };
  },
  props: {
    listSelected: Array,
    groupIndex: Number,
    stageIndex: Number,
    title: String,
    titleCard: String,
    addList: Function,
    groupId: Number,
  },
  computed: {
    ...mapGetters(['NIR_GROUP_LABOR_LIST']),
    checkboxes() {
      console.log(this.NIR_GROUP_LABOR_LIST);
      return this.NIR_GROUP_LABOR_LIST
        .map((el) => this.listSelected.find((selected) => selected.id === el.id));
    },
  },
  methods: {
    ...mapActions(['GET_NIR_GROUP_LABOR_LIST']),
    saveList() {
      if (this.groupIndex === undefined) {
        this.addList(this.stageIndex, this.listSelected.map((el) => ({
          ...el,
          stageIndex: this.stageIndex,
        })));
      } else {
        this.addList(this.stageIndex, this.groupIndex, this.listSelected.map((el) => ({
          ...el,
          stageIndex: this.stageIndex,
        })));
      }
      this.dialog = false;
    },
    showList() {
      this.GET_NIR_GROUP_LABOR_LIST();
      this.dialog = true;
    },
    modList(item) {
      const index = this.listSelected.findIndex((el) => el.id === item.id);
      if (index >= 0) {
        this.listSelected.splice(index, 1);
      } else {
        this.listSelected.push(item);
      }
    },
  },
};
</script>

<style scoped>
  .card-text  {
    max-height: 700px;
    overflow-y: auto;
  }
</style>
