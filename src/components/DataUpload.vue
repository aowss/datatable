<script setup>
import {ref} from "vue";
import Papa from "papaparse";

const emit = defineEmits(['fileSelected', 'dataUploaded']);

const uploading = ref(false);
const data = ref([]);

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
        data.value = results.data;
        const rowsCount = Object.keys(results.data[results.data.length - 1]).length === 1 && !results.data[results.data.length - 1][0] ? results.data.length - 1 : results.data.length
        emit('dataUploaded',
            {
            values: results.data,
            rowsCount: rowsCount,
            columnsCount: results.meta.fields.length
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
