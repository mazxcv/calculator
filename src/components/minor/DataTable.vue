<template>
  <div>
    <v-row>
      <v-col cols="6" style="display: flex; align-items: center">
        <h2>{{title}}</h2>
        <v-btn :to="createLink" x-small class="ml-2" color="primary">создать</v-btn>
      </v-col>
      <v-col cols="4">
        <v-text-field
          single-line
          hide-details
          rounded
          dense
          placeholder="Search"
          filled
          v-model="search"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <select-component
          :items="['2', '5', '10', '25']"
          :init="itemsPerPage.toString()"
          :change="(payload) => itemsPerPage = Number(payload)"
        />
      </v-col>
    </v-row>
    <v-data-table
      class="dataTable"
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      hide-default-footer
      @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <pagination
        :change="changePage"
        :size="pageCount"
        :page="page - 1"
      />
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';
import SelectComponent from './SelectComponent.vue';

export default {
  name: 'DataTable',
  props: {
    title: String,
    headers: Array,
    items: Array,
    createLink: String,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: '',
    };
  },
  components: {
    Pagination,
    SelectComponent,
  },
  methods: {
    changePage(newPage) {
      if (newPage >= 0 && newPage <= this.pageCount - 1) {
        this.page = newPage + 1;
      }
    },
  },
};
</script>

<style scoped>
.dataTable {
  min-height: 720px;
}
</style>
