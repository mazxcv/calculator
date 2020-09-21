<template>
  <div>
    <v-card class="card">
      <v-card-text>
        <data-table
          title="Список НИР"
          :headers="headers"
          :items="NIR_LIST"
          editLink="/list-nir/edit"
          dialogCreate="DialogCreateNir"
          :actions="{
            delete: DELETE_NIR,
          }"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DataTable from '../minor/DataTable.vue';

export default {
  name: 'ListNirPage',
  mounted() {
    this.GET_NIR_LIST();
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
        },
        { text: 'Характер новизны НИР', value: 'nirInnovationPropertyName' },
        { text: 'Маштаб НИР', value: 'nirScaleName' },
        { text: 'Дата создания', value: 'createTime' },
        { text: 'Дата изменения', value: 'updateTime' },
        {
          text: 'Действия',
          value: 'actions',
          align: 'end',
          sortable: false,
        },
      ],
    };
  },
  components: {
    DataTable,
  },
  computed: mapGetters(['NIR_LIST']),
  methods: {
    ...mapActions(['GET_NIR_LIST', 'DELETE_NIR']),
  },
};

</script>

<style scoped>
.card {
  min-height: 860px;
}
</style>
