<template>
  <div>
    <v-timeline dense >
      <v-timeline-item small v-for="(item, i) in stages" :key="i">
        <v-card class="elevation-2">
          <v-card-title style="display: flex; justify-content: space-between">
            <div style="display: flex; align-items: center">
              {{ `${item.title} ${i + 1}`}}
              <dialog-add-works
                title="добавить работу"
                :fullList="[...listLabor]"
                :listSelected="item.list"
                :stageIndex="i"
              />
              <div>
                <dialog-add-works
                  title="добавить группу работ"
                  :fullList="fullListGroups"
                  :listSelected="item.list"
                  :stageIndex="i"
                />
              </div>
            </div>
            <v-btn v-if="i === stages.length - 1 & i !== 0" icon @click="deleteStage">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-simple-table v-if="item.list[0]">
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Виды работ</th>
                  <th style="width: 20%" class="text-left">Трудоемкость</th>
                  <th class="text-left">Действия</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(el, j) in item.list" :key="j">
                    <td >{{ el.name }}</td>
                    <td style="display: flex; align-items: center">
                      <v-slider
                        style="width: 80%"
                        :step="el.step"
                        tick-size="3"
                        ticks="always"
                        :min="el.minVolume"
                        :max="el.overMax"
                        :color="colorSlider(el.maxVolume, stages[i].list[j].volume)"
                        track-color="grey"
                        dense
                        single-line
                        hide-details
                        thumb-label
                        v-model="stages[i].list[j].volume"
                      >
                        <template v-slot:thumb-label="{ value }">
                          {{ value.toFixed(3) }}
                        </template>
                      </v-slider>
                      <div class="pl-1" style="width: 20%">{{el.volume.toFixed(2)}}</div>
                    </td>
                    <td>
                      <v-btn @click="deleteElementList(i, el.id)" icon x-small color="error">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div
              v-else
              style="display: flex; justify-content: center; font-size: 24px"
              class="ma-3"
            >
              Добавьте работы
            </div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-btn :disabled="!stages[stages.length - 1].list[0]" color="primary" @click="addStage">
      add stage
    </v-btn>
  </div>
</template>

<script>
import DialogAddWorks from '../minor/DialogAddWorks.vue';

export default {
  name: 'CalculationNir',
  props: {
    listLabor: Array,
  },
  data() {
    return {
      fullListGroups: [
        {
          id: 6,
          text: 'group1',
          type: 'group',
          works: [
            {
              id: 11,
              text: '42 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
              + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
              + 'laudantium officiis, porro repudiandae tenetur?',
            },
          ],
        },
        {
          id: 7,
          text: 'group2',
          type: 'group',
          works: [
            {
              id: 12,
              text: '34 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
              + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
              + 'laudantium officiis, porro repudiandae tenetur?',
            },
          ],
        },
      ],
      stages: [
        {
          title: 'Этап',
          list: [],
        },
      ],
    };
  },
  methods: {
    colorSlider(maxValue, value) {
      return value > maxValue ? 'error' : 'primary';
    },
    addStage() {
      this.stages = [...this.stages, { title: 'Этап', list: [] }];
    },
    deleteStage() {
      this.stages.pop();
    },
    deleteElementList(stageId, elementId) {
      const index = this.stages[stageId].list.findIndex((el) => el.id === elementId);
      this.stages[stageId].list.splice(index, 1);
    },
  },
  components: {
    DialogAddWorks,
  },
};
</script>

<style scoped>
 .main-container{
   padding: 2% 8% 2% 2%;
 }
</style>
