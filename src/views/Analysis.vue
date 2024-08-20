<script setup>
import {ref} from "vue";
import DataUpload from "@/components/DataUpload.vue";
import DataView from "@/components/DataView.vue";
import DataSummary from "@/components/DataSummary.vue";

const data = ref('')

const setData = (uploadedData) => {
  data.value = uploadedData
  console.log("data", data.value)
}
</script>

<template>
  <DataUpload @dataUploaded="setData"/>
  <br/>
  <DataSummary v-if="data" :tableData="data.tableData" :columns="data.columns"/>
  <br/>
  <DataView v-if="data" :tableData="data.tableData" :columns="data.columns"/>
</template>
