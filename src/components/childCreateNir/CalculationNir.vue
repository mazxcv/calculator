<template>
  <div>
    <v-timeline dense >
      <v-timeline-item small v-for="(item, i) in stages" :key="i">
        <v-card class="elevation-2">
          <v-card-title style="display: flex; justify-content: space-between">
            <div style="display: flex; align-items: center">
              <div>{{ `${item.title} ${i + 1}`}}</div>
              <dialog-add-works
                class="ml-2 mb-1"
                title="добавить работы"
                :fullList="listLabor"
                :listSelected="[...item.list]"
                :stageIndex="i"
                :addList="addListLabor"
              />
              <div>
                <dialog-add-groups
                  title="добавить группы работ"
                  :fullList="fullListGroups"
                  :listSelected="[...item.groups]"
                  :stageIndex="i"
                  :addList="addListGroup"
                />
              </div>
              <v-btn class="ml-2" color="primary" :disabled="!valid" x-small>сохранить</v-btn>
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
                  <th style="width: 75%" class="text-left">Виды работ</th>
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
                        :color="colorSlider(el.maxVolume, item.list[j].volume)"
                        track-color="grey"
                        dense
                        single-line
                        hide-details
                        thumb-label
                        v-model="item.list[j].volume"
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
            <h4 v-if="item.groups[0]" class="mt-5">Группы работ:</h4>
            <v-expansion-panels
              flat
              multiple
              hover
              accordion
              focusable
            >
              <v-expansion-panel v-for="(group, j) in item.groups" :key="j">
                <v-expansion-panel-header>
                  <div>
                    <div style="display: flex" class="mb-2">
                      <dialog-add-works
                        :activeClass="false"
                        title="добавить работы"
                        :fullList="group.works"
                        :listSelected="[...item.groups[j].list]"
                        :stageIndex="i"
                        :groupIndex="j"
                        :addList="addListLaborToGroup"
                      />
                      <v-btn
                        @click.stop="deleteGroup(i, group.id)"
                        class="ml-2"
                        x-small
                        outlined
                        color="error"
                      >
                        Удалить группу
                      </v-btn>
                    </div>
                    {{group.name}}
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-simple-table>
                    <template>
                      <thead>
                      <tr>
                        <th style="width: 75%" class="text-left">Виды работ</th>
                        <th style="width: 20%" class="text-left">Трудоемкость</th>
                        <th class="text-left">Действия</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(labor, key) in group.list" :key="key">
                        <td >{{labor.name}}</td>
                        <td >test1</td>
                        <td >test2</td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
                <v-divider v-if="j !== item.groups.length - 1"/>
              </v-expansion-panel>
            </v-expansion-panels>
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
import DialogAddGroups from '../minor/DialogAddGroups.vue';

export default {
  name: 'CalculationNir',
  props: {
    listLabor: Array,
  },
  data() {
    return {
      valid: true,
      fullListGroups: [
        {
          id: 6,
          name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus rereg',
          list: [],
          works: [
            {
              id: 11,
              name: '42 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
              + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
              + 'laudantium officiis, porro repudiandae tenetur?',
            },
          ],
        },
        {
          id: 7,
          name: 'Lorem ipsum dolor sit amet',
          list: [],
          works: [
            {
              id: 12,
              name: '34 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
              + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
              + 'laudantium officiis, porro repudiandae tenetur?',
            },
          ],
        },
      ],
      testList: [
        {
          maxVolume: 0.01,
          minVolume: 0.02,
          step: 0.001,
          volume: 0.017,
          overMax: 0.023,
          name: 'Выборка рекомендаций по использованию результатов НИР',
        },
      ],
      stages: [
        {
          title: 'Этап',
          list: [],
          groups: [],
        },
      ],
    };
  },
  methods: {
    colorSlider(maxValue, value) {
      return value > maxValue ? 'error' : 'primary';
    },
    addStage() {
      this.stages = [...this.stages, { title: 'Этап', list: [], groups: [] }];
    },
    addListLabor(index, list) {
      this.stages[index].list = list;
    },
    addListLaborToGroup(indexStage, indexGroup, list) {
      this.stages[indexStage].groups[indexGroup].list = list;
    },
    addListGroup(index, groups) {
      this.stages[index].groups = groups;
    },
    deleteStage() {
      this.stages.pop();
    },
    deleteGroup(indexStage, idGroup) {
      console.log(indexStage);
      console.log(idGroup);
      this.stages[indexStage].groups = this.stages[indexStage].groups
        .filter((el) => el.id !== idGroup);
    },
    deleteElementList(stageId, elementId) {
      const index = this.stages[stageId].list.findIndex((el) => el.id === elementId);
      this.stages[stageId].list.splice(index, 1);
    },
  },
  components: {
    DialogAddWorks,
    DialogAddGroups,
  },
};
</script>

<style scoped>
 .main-container{
   padding: 2% 8% 2% 2%;
 }
</style>
