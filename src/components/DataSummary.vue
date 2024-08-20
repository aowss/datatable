<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {computed} from "vue";

const props = defineProps({
  tableData: {
    required: true
  },
  columns: {
    required: true
  }
})

const data = computed(() => {
  const result = []
  const dataByKey = props.tableData.reduce((acc, cur) => {
    for (const [key, value] of Object.entries(cur)) {
      if (!acc[key]) acc[key] = []
      acc[key].push(value)
    }
    return acc
  }, {})
  for (const [key, value] of Object.entries(dataByKey)) {
    const values = value.filter(val => val && val.trim().length > 0)
    const sorted = values.sort()
    result.push({
      name: key,
      type: 'unknown',
      notEmpty: values.length,
      range: `${sorted[0]} - ${sorted[sorted.length - 1]}`,
      uniqueCount: new Set(sorted).size,
      valid: true
    })
  }
  return result
});

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'type', header: 'Type' },
  { field: 'notEmpty', header: 'Has a value?' },
  { field: 'range', header: 'Range' },
  { field: 'uniqueCount', header: 'Unique Values' },
  { field: 'valid', header: 'Valid?' }
]
</script>

<template>
  <div>
    <DataTable :value="data">
      <Column v-for="(col, index) in columns" :field="col.field" :header="col.header" :key="index" sortable />
    </DataTable>
  </div>
</template>
