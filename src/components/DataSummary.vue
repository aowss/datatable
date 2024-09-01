<script setup>
import { reactive, ref } from 'vue'
import { formatHints, typesHint, validateAll } from '@/lib/validation.js'
import PercentageComponent from '@/components/PercentageComponent.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const rangeLabel = (min, max, uniqueValues) =>
  uniqueValues.size === 1
    ? uniqueValues.values().next().value
    : uniqueValues.size <= 3
      ? Array.from(uniqueValues)
      : `From '${('' + min).length <= 5 ? ('' + min).substring(0, 5) : ('' + min).substring(0, 5).concat('...')}' to '${('' + max).length <= 5 ? ('' + max).substring(0, 5) : ('' + max).substring(0, 5).concat('...')}'`

const summarize = (data) => {
  const result = []
  const dataByKey = data.values.reduce((acc, cur) => {
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
      type: typesHint(uniqueValues),
      format: formatHints(uniqueValues),
      notEmpty: sortedValues.length,
      range: {
        min: min,
        max: max,
        label: rangeLabel(min, max, uniqueValues)
      },
      uniqueValues: uniqueValues,
      validationCode: '',
      validValues: []
    })
  }
  return result
}

const summary = reactive(summarize(props.data))

const readyToValidate = ref(false)

const onCellEditComplete = (event) => {
  let { data, newValue, value, field } = event
  if (
    field === 'validationCode' &&
    newValue.trim().length > 0 &&
    newValue.trim() !== value.trim()
  ) {
    data['validationCode'] = newValue
    readyToValidate.value = true
    const asyncFn = new AsyncFunction('value', data['validationCode'])
    validateAll(data['uniqueValues'], asyncFn).then((values) => (data['validValues'] = values))
  } else event.preventDefault()
}
</script>

<template>
  <div data-cy="dataSummary" class="card">
    <div class="card-img-overlay" style="width: 100%">
      <Tag icon="pi pi-bars" severity="contrast" :value="`Row Count: ${data.rowsCount}`" /> &nbsp;
      <Tag
        icon="pi pi-arrows-h"
        severity="contrast"
        :value="`Column Count: ${data.columnsCount}`"
      />
      &nbsp;
      <br />
      <DataTable
        :value="summary"
        size="small"
        stripedRows
        editMode="cell"
        @cell-edit-complete="onCellEditComplete"
      >
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
            <PercentageComponent
              :total="data.rowsCount"
              :count="slotProps.data.uniqueValues.size"
            />
          </template>
        </Column>
        <Column field="validationCode" header="Validation Code">
          <template #editor="{ data, field }">
            <Textarea
              id="code"
              v-model="data[field]"
              variant="filled"
              autoResize
              rows="2"
              cols="30"
              :placeholder="`return value.startsWith('A') // signature: async function(value: ${data.type.replace(',', ' |')}): boolean`"
              fluid
            />
          </template>
        </Column>
        <Column header="Valid">
          <template #body="slotProps">
            <PercentageComponent
              v-if="readyToValidate"
              :total="slotProps.data.uniqueValues.size"
              :count="slotProps.data.validValues.filter((result) => result === true).length"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
