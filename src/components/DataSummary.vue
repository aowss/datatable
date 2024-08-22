<script setup>
import Tag from 'primevue/tag';
import ProgressBar from "primevue/progressbar";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {computed, ref} from "vue";

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
    const values = value.filter(val => val && val.trim().length > 0)
    const sorted = values.sort()
    result.push({
      name: key,
      type: 'unknown',
      notEmpty: values.length,
      range: {
        min: sorted[0],
        max: sorted[sorted.length - 1],
      },
      uniqueValues: new Set(sorted),
      valid: true
    })
  }
  return result
});

const displayableSummary = computed(() => summary.value.map(column => ({
      name: column.name,
      type: column.type,
      notEmpty: {
        value: column.notEmpty * 100 / props.data.rowsCount,
        label: `${column.notEmpty} / ${props.data.rowsCount}`
      },
      range: column.uniqueValues.size === 1 ? column.uniqueValues.values().next().value : column.uniqueValues.size <= 3 ? Array.from(column.uniqueValues) : `From '${column.range.min.length <= 5 ? column.range.min.substring(0, 5) : column.range.min.substring(0, 5).concat('...')}' to '${column.range.max.length <= 5 ? column.range.max.substring(0, 5) : column.range.max.substring(0, 5).concat('...')}'`,
      unique: {
        value: column.uniqueValues.size * 100 / props.data.rowsCount,
        label: `${column.uniqueValues.size} / ${props.data.rowsCount}`
      },
      valid: {
        value: column.uniqueValues.size * 100 / props.data.rowsCount,
        label: `${column.uniqueValues.size} / ${props.data.rowsCount}`
      }
    })
  )
)
</script>

<template>
  <div>
    <Tag icon="pi pi-bars" severity="contrast" :value="`Row Count: ${data.rowsCount}`"></Tag> &nbsp;
    <Tag icon="pi pi-arrows-h" severity="contrast" :value="`Column Count: ${data.columnsCount}`"></Tag> &nbsp;
    <br/>
    <DataTable :value="displayableSummary" size="small" stripedRows>
      <Column field="name" header="Name"/>
<!--      <Column field="type" header="Type"/>-->
      <Column field="notEmpty" header="Has a value?">
        <template #body="slotProps">
          <ProgressBar :value="slotProps.data.notEmpty.value">{{ slotProps.data.notEmpty.label }}</ProgressBar>
        </template>
      </Column>
      <Column field="range" header="Range"/>
      <Column field="unique" header="Unique Values">
        <template #body="slotProps">
          <ProgressBar :value="slotProps.data.unique.value">{{ slotProps.data.unique.label }}</ProgressBar>
        </template>
      </Column>
<!--      <Column field="valid" header="Valid?">-->
<!--        <template #body="slotProps">-->
<!--          <ProgressBar :value="slotProps.data.valid * 100 / data.rowsCount">{{ slotProps.data.valid }} / {{ data.rowsCount }}</ProgressBar>-->
<!--        </template>-->
<!--      </Column>-->
    </DataTable>
  </div>
</template>
