<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {computed} from "vue";

const props = defineProps({
  data: {
    required: true
  }
})

const columns = computed(() => Object.keys(props.data[0])
    .map(key => ({
      field: key,
      header: key.charAt(0).toUpperCase() + key.slice(1)
    })))
</script>

<template>
  <div>
    <DataTable :value="data" sortMode="multiple" removableSort paginator :rows="50" :rowsPerPageOptions="[10, 50, 100]">
      <template #empty> No data. </template>
      <template #loading> Loading data. Please wait. </template>
      <Column v-for="(col, index) in columns" :field="col.field" :header="col.header" :key="index" sortable />
    </DataTable>
  </div>
</template>
