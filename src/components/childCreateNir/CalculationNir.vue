<template>
  <div>
    <v-timeline dense >
      <v-timeline-item small v-for="(item, i) in stages" :key="i">
        <v-card class="elevation-2">
          <v-card-title style="display: flex; justify-content: space-between">
            <div style="display: flex; ">
              {{ `${item.title} ${i + 1}`}}
              <dialog-for-adding-nir
                :fullListNir="fullListNir"
                :listSelectedNir="item.list"
                :addList="addList"
                :stageIndex="i"
              />
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
                  <th class="text-left">text</th>
                  <th class="text-left">actions</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(el, j) in item.list" :key="j">
                    <td>{{ el.text }}</td>
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
              select nir
            </div>
            <!--<li v-for="(el, i) in item.list" :key="i">{{ el.text }}</li>-->
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
import DialogForAddingNir from '../minor/DialogForAddingNir.vue';

export default {
  name: 'CalculationNir',
  data() {
    return {
      fullListNir: [
        {
          id: 0,
          type: 'nir1',
          text: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
          + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
          + 'laudantium officiis, porro repudiandae tenetur?',
        },
        {
          id: 1,
          type: 'nir1',
          text: '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
          + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
          + 'laudantium officiis, porro repudiandae tenetur?',
        },
        {
          id: 2,
          type: 'nir1',
          text: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
          + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
          + 'laudantium officiis, porro repudiandae tenetur?',
        },
        {
          id: 3,
          type: 'nir2',
          text: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
          + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
          + 'laudantium officiis, porro repudiandae tenetur?',
        },
        {
          id: 4,
          type: 'nir2',
          text: '5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
          + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
          + 'laudantium officiis, porro repudiandae tenetur?',
        },
        {
          id: 5,
          type: 'nir2',
          text: '6 Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta eaque '
          + 'iste odio quasi reprehenderit voluptatibus. Adipisci cum dolor incidunt '
          + 'laudantium officiis, porro repudiandae tenetur?',
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
    addStage() {
      this.stages = [...this.stages, { title: 'Этап', list: [] }];
    },
    addList(list, stageIndex) {
      console.log(list);
      console.log(stageIndex);
      this.stages[stageIndex].list = list;
    },
    deleteStage() {
      this.stages.pop();
    },
    deleteElementList(stageId, elementId) {
      const index = this.stages[stageId].list.findIndex((el) => el.id === elementId);
      console.log(index);
      this.stages[stageId].list.splice(index, 1);
    },
  },
  components: {
    DialogForAddingNir,
  },
};
</script>

<style scoped>
 .main-container{
   padding: 2% 8% 2% 2%;
 }
</style>
