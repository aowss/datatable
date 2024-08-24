<script setup>
import { computed, ref } from 'vue'
import Papa from 'papaparse'

const emit = defineEmits(['fileSelected', 'dataUploaded'])

const uploading = ref(false)
const parsingResults = ref()

const data = computed(() => {
  if (!parsingResults.value) return undefined
  if (
    parsingResults.value.data[parsingResults.value.data.length - 1] !== undefined &&
    Object.keys(parsingResults.value.data[parsingResults.value.data.length - 1]).length === 1 &&
    !parsingResults.value.data[parsingResults.value.data.length - 1][0]
  ) {
    return parsingResults.value.data.slice(0, -1)
  } else {
    return parsingResults.value.data
  }
})
const rowsCount = computed(() => data.value.length)
const columnsCount = computed(() => parsingResults.value.meta.fields.length)

async function parse(event) {
  uploading.value = true
  data.value = undefined
  const file = event.target.files[0]
  if (file) {
    emit('fileSelected', {
      lastModified: new Date(file.lastModified),
      size: file.size,
      type: file.type
    })
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        parsingResults.value = results
        emit('dataUploaded', {
          values: data.value,
          rowsCount: rowsCount.value,
          columnsCount: columnsCount.value
        })
        uploading.value = false
      }
    })
  }
}
</script>

<template>
  <div data-cy="dataUpload" class="card">
    <div class="card-img-overlay" style="width: 100%">
      <input type="file" @change="parse" :disabled="uploading" />
    </div>
  </div>
</template>
