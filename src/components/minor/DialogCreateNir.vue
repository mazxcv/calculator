<template>
  <div>
    <v-btn
      x-small
      class="ml-2"
      color="primary"
      @click.stop="dialog = true"
    >
      создать
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="900"
    >
      <v-card>
        <v-card-title>Создание НИР</v-card-title>
        <v-card-text class="card-text">
          <v-text-field
            v-model="name"
            single-line
            hide-details
            rounded
            dense
            placeholder="Название"
            filled
          ></v-text-field>
          <v-row class="ma-2">
            <v-col cols="3">
              <v-row>
                <v-col class="header center border-left border-top" cols="12">
                  Характеристика новизны
                </v-col>
                <v-col class="cell border-left" cols="12">
                  Работа в развитии предшевтсвующей
                </v-col>
                <v-col class="cell border-left" cols="12">
                  Работа с известным аналогом
                </v-col>
                <v-col class="cell border-left" cols="12">
                  Работа, не имеющая известных аналогов
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="9">
              <v-row>
                <v-col class="cell center border-top" cols="12">
                  Коффициент новизны Кн НИР
                </v-col>
                <v-col class="cell center" cols="4">
                  Фундоментальная НИР
                </v-col>
                <v-col class="cell center" cols="4">
                  Прикладная НИР, без создания ЭО или макета
                </v-col>
                <v-col class="cell center" cols="4">
                  Прикладная НИР, с разработкой и изготовлением ЭО или макета
                </v-col>
                <v-col
                  class="cell center"
                  v-for="(item, i) in LIST_NIR_INNOVATION_RATE" :key="i"
                  cols="4"
                >
                  <v-btn
                    v-bind:class="{ btn: nirInnovationRate.id === item.id }"
                    @click="saveInnovationRate(item)"
                    color="primary"
                    style="height: 100%; width: 100%"
                    text
                  >
                    {{item.value}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="createNir"
          >
            Создать
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
  mounted() {
    this.GET_LIST_NIR_INNOVATION_RATE();
  },
  name: 'DialogCreateNir.vue',
  data() {
    return {
      name: '',
      nirInnovationRate: '',
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(['LIST_NIR_INNOVATION_RATE']),
  },
  methods: {
    ...mapActions(['GET_LIST_NIR_INNOVATION_RATE', 'CREATE_NIR']),
    saveInnovationRate(item) {
      this.nirInnovationRate = item;
    },
    createNir() {
      this.CREATE_NIR({
        id: 0,
        name: this.name,
        nirInnovationPropertyID: this.nirInnovationRate.nirInnovationPropertyID,
        nirScaleID: this.nirInnovationRate.nirScaleID,
        createTime: new Date(),
      });
    },
  },
};
</script>

<style scoped>
  .btn {
    background-color: rgba(25, 118, 210, 0.1);
  }
  .cell {
    height: 60px;
    padding: 2px;
    border-bottom: 1px solid rgba(146, 146, 146, 0.3);
    border-right: 1px solid rgba(146, 146, 146, 0.3);
  }
  .header {
    height: 120px;
    padding: 2px;
    border-bottom: 1px solid rgba(146, 146, 146, 0.3);
    border-right: 1px solid rgba(146, 146, 146, 0.3);
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .border-left {
    border-left: 1px solid rgba(146, 146, 146, 0.3);
  }
  .border-top {
    border-top: 1px solid rgba(146, 146, 146, 0.3);
  }
</style>
