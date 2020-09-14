<template>
  <div style="width: 100%">
    <v-card>
      <!--<v-card-text>-->
        <!--<v-row>-->
          <!--<v-col class="cell" cols="1">№ п/п</v-col>-->
          <!--<v-col class="cell" cols="3">Характеристика новизны</v-col>-->
          <!--<v-col class="cell" cols="8">dddd</v-col>-->

          <!--<v-col class="cell" cols="1">1</v-col>-->
          <!--<v-col class="cell" cols="3">Работа в развитии предшевтсвующей</v-col>-->
          <!--<v-col class="cell" cols="8">dddd</v-col>-->

          <!--<v-col class="cell" cols="1">2</v-col>-->
          <!--<v-col class="cell" cols="3">Работа с известным аналогом</v-col>-->
          <!--<v-col class="cell" cols="8">dddd</v-col>-->

          <!--<v-col class="cell" cols="1">3</v-col>-->
          <!--<v-col class="cell" cols="3">Работа, не имеющая известных аналогов</v-col>-->
          <!--<v-col class="cell" cols="8">dddd</v-col>-->
        <!--</v-row>-->
      <!--</v-card-text>-->
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
