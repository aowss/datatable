<script setup>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {computed} from "vue";

const props = defineProps({
  data: {
    required: true
  },
  fileDetails: {
    required: true
  }
})

const summary = computed(() => {
  const result = []
  const dataByKey = props.data.values.reduce((acc, cur) => {
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
    <Card>
      <template #title>File Details</template>
      <template #content>
        <p class="m-0">Last Modified: {{fileDetails.lastModified}}</p>
        <p class="m-0">Size: {{fileDetails.size}}</p>
        <p class="m-0">Type: {{fileDetails.type}}</p>
        <p class="m-0">Rows Count: {{data.rowsCount}}</p>
        <p class="m-0">Columns Count: {{data.columnsCount}}</p>
      </template>
    </Card>

    <DataTable :value="summary">
      <Column v-for="(col, index) in columns" :field="col.field" :header="col.header" :key="index" />
    </DataTable>
  </div>
</template>
