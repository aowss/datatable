<script setup>
import {computed, ref} from "vue";
import Papa from "papaparse";

const emit = defineEmits(['fileSelected', 'dataUploaded']);

const uploading = ref(false);
const parsingResults = ref()
const data = computed(() => parsingResults.value.data)
const rowsCount = computed(() => Object.keys(data.value[data.value.length - 1]).length === 1 && !data.value[data.value.length - 1][0] ? data.value.length - 1 : data.value.length)
const columnsCount = computed(() => parsingResults.value.meta.fields.length)

async function parse(event) {
  uploading.value = true
  data.value = undefined
  const file = event.target.files[0];
  if (file) {
    emit('fileSelected',
        {
          lastModified: new Date(file.lastModified),
          size: file.size,
          type: file.type
        }
    )
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        parsingResults.value = results;
        emit('dataUploaded',
            {
            values: data.value,
            rowsCount: rowsCount.value,
            columnsCount: columnsCount.value
          }
        )
        uploading.value = false
      }
    });
  }
}
</script>

<template>
  <div data-cy="dataUpload" class="card">
    <div class="card-img-overlay" style="width: 100%;">
      <input type="file" @change="parse" :disabled="uploading"/>
    </div>
  </div>
</template>
