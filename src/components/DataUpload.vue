<script setup>
import FileUpload from 'primevue/fileupload';
import {ref} from "vue";
import Papa from "papaparse";

const emit = defineEmits(["dataUploaded"]);

const uploading = ref(false);
const lastModified = ref('')
const size = ref(0)
const type = ref('')
const tableData = ref([]);
const columns = ref([]);

async function parse(event) {
  uploading.value = true
  const file = event.target.files[0];
  console.log('file', file);
  lastModified.value = new Date(file.lastModified).toString()
  size.value = file.size
  type.value = file.type
  if (file) {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log('result', results)
        tableData.value = results.data;
        if (results.data.length > 0) {
          columns.value = Object.keys(results.data[0]).map(key => ({
            field: key,
            header: key.charAt(0).toUpperCase() + key.slice(1)
          }));
        }
        emit('dataUploaded', { tableData, columns })
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
      <p v-if="uploading">
        Last Modified: {{lastModified}}
        Size: {{size}}
        Type: {{file}}
      </p>

<!--      <FileUpload name="data" @upload="parse()" :multiple="false" accept=".csv" :maxFileSize="1000000">-->
<!--        <template #empty>-->
<!--          <p class="text-center">Upload data file in CSV format.</p>-->
<!--        </template>-->
<!--      </FileUpload>-->
    </div>
  </div>
</template>
