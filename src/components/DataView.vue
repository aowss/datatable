<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

defineProps({
  tableData: {
    required: true
  },
  columns: {
    required: true
  }
})
</script>

<template>
  <div>
    <DataTable :value="tableData" sortMode="multiple" removableSort paginator :rows="50" :rowsPerPageOptions="[10, 50, 100]">
      <template #empty> No data. </template>
      <template #loading> Loading data. Please wait. </template>
      <Column v-for="(col, index) in columns" :field="col.field" :header="col.header" :key="index" sortable />
    </DataTable>
  </div>
</template>
