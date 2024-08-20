<template>
  <div>
    <input type="file" @change="onFileChange" />
    <DataTable :value="tableData" sortMode="multiple" removableSort paginator :rows="50" :rowsPerPageOptions="[10, 50, 100]">
      <template #empty> No data. </template>
      <template #loading> Loading data. Please wait. </template>
      <Column v-for="(col, index) in columns" :field="col.field" :header="col.header" :key="index" sortable />
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';
import Papa from 'papaparse';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

export default {
  components: {
    DataTable,
    Column
  },
  setup() {
    const tableData = ref([]);
    const columns = ref([]);

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            tableData.value = results.data;
            if (results.data.length > 0) {
              columns.value = Object.keys(results.data[0]).map(key => ({
                field: key,
                header: key.charAt(0).toUpperCase() + key.slice(1)
              }));
            }
          }
        });
      }
    };

    return {
      tableData,
      columns,
      onFileChange
    };
  }
};
</script>

<style>
/* Add any necessary styles here */
</style>
