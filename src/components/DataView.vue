<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const columns = computed(() =>
  Object.keys(props.data[0]).map((key) => ({
    field: key,
    header: key.charAt(0).toUpperCase() + key.slice(1)
  }))
)
</script>

<template>
  <div data-cy="dataView" class="card">
    <div class="card-img-overlay" style="width: 100%">
      <DataTable
        :value="data"
        size="small"
        stripedRows
        sortMode="multiple"
        removableSort
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 50, 100]"
      >
        <template #empty> No data. </template>
        <template #loading> Loading data. Please wait. </template>
        <Column
          v-for="(col, index) in columns"
          :field="col.field"
          :header="col.header"
          :key="index"
          sortable
        />
      </DataTable>
    </div>
  </div>
</template>
