<template>
  <div class="mb-5" style="width: 100%">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <div style="display: flex; align-items: center">
            Коффициент новизны Кн НИР
            <v-icon color="warning" class="ml-2">mdi-alert-circle</v-icon>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card elevation="0">
            <v-card-text>
              <v-row>
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
                      v-for="(item, i) in arr" :key="i"
                      cols="4"
                    >
                      <v-btn
                        @click="message(item)"
                        active
                        color="primary"
                        style="height: 100%; width: 100%"
                        text
                      >
                        {{item}}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'NoveltyRate',
  data() {
    return {
      arr: [1.3, 1.0, 1.2, 1.7, 1.4, 1.7, 2.9, 2.5, 2.7],
    };
  },
  methods: {
    message(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.btn:hover {
  background-color: rgba(146, 146, 146, 0.3);
}
.cell {
  height: 50px;
  padding: 2px;
  border-bottom: 1px solid rgba(146, 146, 146, 0.3);
  border-right: 1px solid rgba(146, 146, 146, 0.3);
}
.header {
  height: 100px;
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
