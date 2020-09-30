<template>
  <div>
    <div style="display: flex">
      <h2 class="text--secondary">{{data.nir.name}} </h2>
      <v-chip class="ml-3" outlined color="success">
        <v-avatar left>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-avatar>
        {{volumeNir.toFixed(3)}}
      </v-chip>
    </div>
    <v-timeline v-if="stages[0]" dense >
      <v-timeline-item small v-for="(item, i) in stages" :key="i">
        <v-card class="elevation-2">
          <v-card-title
            style="position: relative; display: flex; justify-content: space-between"
          >
            <v-row>
              <v-col style="display: flex; align-items: center" cols="9">
                <div>Этап {{i + 1}}</div>
                <dialog-add-works
                  class="ml-2 mb-1"
                  title="добавить работы"
                  :fullList="listLabor"
                  :listSelected="[...item.list]"
                  :stageIndex="i"
                  titleCard="Список работ"
                  :addList="addListLabor"
                />
                <div>
                  <dialog-add-groups
                    title="добавить группы работ"
                    titleCard="Список групп работ"
                    :fullList="listGroup"
                    :listSelected="[...item.groups]"
                    :stageIndex="i"
                    :addList="addListGroup"
                  />
                </div>
                <v-btn class="ml-2" color="primary" :disabled="!valid" x-small>сохранить</v-btn>
              </v-col>
              <v-col cols="3" style="display: flex; align-items: center; justify-content: flex-end">
                <v-chip outlined color="success">
                  <v-avatar left>
                    <v-icon>mdi-cash-multiple</v-icon>
                  </v-avatar>
                  {{`${(sumLabor[i]).toFixed(3)} *
                  ${item.innovationRate.value ? item.innovationRate.value : 0}
                  = ${(volumeLaborStages[i]).toFixed(3)}`}}
                </v-chip>
                <v-btn
                  class="ml-2"
                  v-if="i === stages.length - 1 & i !== 0"
                  icon
                  @click="deleteStage"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text >
            <div v-if="item.list[0] || item.groups[0]">
              <v-expansion-panels
                flat
                multiple
                hover
                accordion
                focusable
              >
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div style="display: flex; align-items: center">
                      Коффициент новизны:
                      <v-icon
                        v-if="!item.innovationRate.value"
                        class="ml-2"
                        color="warning"
                      >
                        mdi-alert-circle
                      </v-icon>
                      <div class="ml-2">{{item.innovationRate.value}}</div>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <novelty-rate
                      :saveInnovationRate="addInnovationRateStage"
                      :listLabor="sortListLabor"
                      :nirInnovationRate="item.innovationRate"
                      :stageId="i"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div style="display: flex; align-items: center">
                      Объем работ:
                      <v-icon
                        v-if="!sumLabor[i]"
                        class="ml-2"
                        color="warning"
                      >
                        mdi-alert-circle
                      </v-icon>
                      <div class="ml-2">{{sumLabor[i].toFixed(3)}}</div>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
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
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <h4 v-if="item.groups[0]" class="mt-5">Группы работ:</h4>
              <v-expansion-panels
                flat
                multiple
                hover
                accordion
                focusable
              >
                <v-expansion-panel
                  :readonly="!group.list[0]" v-for="(group, j) in item.groups"
                  :key="j"
                >
                  <v-expansion-panel-header>
                    <div>
                      <div style="display: flex" class="mb-2">
                        <dialog-add-works-from-group
                          :activeClass="false"
                          title="добавить работы"
                          titleCard="Список работ"
                          :listSelected="[...item.groups[j].list]"
                          :stageIndex="i"
                          :groupIndex="j"
                          :groupId="group.id"
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
            </div>
            <div
              v-else
              class="ma-3 mb-6 inf-block"
            >
              <v-icon class="icon-info">mdi-playlist-plus</v-icon>
              <div style="display: flex; justify-content: center">
                Добавьте работы
              </div>

            </div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-btn
      :disabled="stages[0] ? !stages[stages.length - 1].list[0] : false"
      color="primary"
      @click="addStage()"
    >
      Добавить этап
    </v-btn>
  </div>
</template>

<script>
import DialogAddWorks from '../minor/DialogAddWorks.vue';
import DialogAddGroups from '../minor/DialogAddGroups.vue';
import DialogAddWorksFromGroup from '../minor/DialogAddWorksFromGroup.vue';
import NoveltyRate from './NoveltyRate.vue';
import sortListInnovationRate from '../../utils/helpers';

export default {
  name: 'CalculationNir',
  props: {
    listLabor: Array,
    listGroup: Array,
    actions: Object,
    data: Object,
    nirId: Number,
  },
  components: {
    DialogAddWorks,
    DialogAddGroups,
    DialogAddWorksFromGroup,
    NoveltyRate,
  },
  data() {
    return {
      nirInnovationRate: {},
      valid: true,
      stages: [{
        list: [],
        groups: [],
        innovationRate: {},
      }],
    };
  },
  computed: {
    sortListLabor() {
      return sortListInnovationRate(this.data.listNirInnovationRate);
    },
    sumLabor() {
      return this.stages.map((stage) => stage.list.reduce((acc, el) => acc + el.volume, 0));
    },
    volumeLaborStages() {
      return this.stages.map((stage, i) => {
        if (stage.innovationRate.value) {
          return stage.innovationRate.value * this.sumLabor[i];
        }
        return 0;
      });
    },
    volumeNir() {
      return this.volumeLaborStages.reduce((acc, el) => acc + el, 0);
    },
  },
  methods: {
    addInnovationRateStage(item, stageId) {
      this.stages[stageId].innovationRate = item;
    },
    colorSlider(maxValue, value) {
      return value > maxValue ? 'error' : 'primary';
    },
    addStage() {
      this.stages = [...this.stages, { list: [], groups: [], innovationRate: {} }];
      this.actions.addStage({
        id: 0,
        nirID: this.data.nir.id,
        stageID: 2,
      });
    },
    addListLabor(index, list) {
      this.stages[index].list = list;
    },
    addListLaborToGroup(indexStage, indexGroup, list) {
      this.stages[indexStage].groups[indexGroup].list = list;
    },
    addListGroup(index, groups) {
      this.stages[index].groups = groups.map((el) => ({
        ...el,
        list: [],
      }));
    },
    deleteStage() {
      this.stages.pop();
    },
    deleteGroup(indexStage, idGroup) {
      this.stages[indexStage].groups = this.stages[indexStage].groups
        .filter((el) => el.id !== idGroup);
    },
    deleteElementList(stageId, elementId) {
      const index = this.stages[stageId].list.findIndex((el) => el.id === elementId);
      this.stages[stageId].list.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.icon-info {
  color: rgba(117, 117, 117, 0.6);
  font-size: 6vw;
}
.inf-block {
  color: rgba(117, 117, 117, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
}

</style>
