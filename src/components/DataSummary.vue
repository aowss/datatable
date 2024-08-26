<script setup>
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import PercentageComponent from '@/components/PercentageComponent.vue'

import { computed } from 'vue'
import { formatHints, typesHint } from '@/lib/validation.js'

const props = defineProps({
  data: {
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
    const sortedValues = value
      .filter((val) => val && (typeof val !== 'string' || val.trim().length > 0))
      .sort()
    const min = sortedValues[0]
    const max = sortedValues[sortedValues.length - 1]
    const uniqueValues = new Set(sortedValues)
    result.push({
      name: key,
      // type: Array.from(new Set(Array.from(uniqueValues).map((v) => typeof v))).join(', '),
      type: typesHint(uniqueValues),
      format: formatHints(uniqueValues),
      notEmpty: sortedValues.length,
      range: {
        min: min,
        max: max,
        label:
          uniqueValues.size === 1
            ? uniqueValues.values().next().value
            : uniqueValues.size <= 3
              ? Array.from(uniqueValues)
              : `From '${('' + min).length <= 5 ? ('' + min).substring(0, 5) : ('' + min).substring(0, 5).concat('...')}' to '${('' + max).length <= 5 ? ('' + max).substring(0, 5) : ('' + max).substring(0, 5).concat('...')}'`
      },
      uniqueValues: uniqueValues,
      valid: true
    })
  }
  return result
})
</script>

<template>
  <div>
    <Tag icon="pi pi-bars" severity="contrast" :value="`Row Count: ${data.rowsCount}`"></Tag> &nbsp;
    <Tag
      icon="pi pi-arrows-h"
      severity="contrast"
      :value="`Column Count: ${data.columnsCount}`"
    ></Tag>
    &nbsp;
    <br />
    <DataTable :value="summary" size="small" stripedRows>
      <Column field="name" header="Name" />
      <Column field="type" header="Type">
        <template #body="{ data }">
          <Tag :value="data.type" v-tooltip="data.format" />
        </template>
      </Column>
      <Column field="notEmpty" header="Has a value?">
        <template #body="slotProps">
          <PercentageComponent :total="data.rowsCount" :count="slotProps.data.notEmpty" />
        </template>
      </Column>
      <Column field="range.label" header="Range" />
      <Column field="unique" header="Unique Values">
        <template #body="slotProps">
          <PercentageComponent :total="data.rowsCount" :count="slotProps.data.uniqueValues.size" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
