<script setup>
import {ref} from "vue";
import DataUpload from "@/components/DataUpload.vue";
import DataView from "@/components/DataView.vue";
import DataSummary from "@/components/DataSummary.vue";
import FileSummary from "@/components/FileSummary.vue";

const data = ref('')
const file = ref()

const setData = (uploadedData) => data.value = uploadedData

const fileSelected = (metadata) => file.value = metadata
</script>

<template>
  <DataUpload @fileSelected="fileSelected" @dataUploaded="setData"/>
  <br/>
  <FileSummary v-if="file" :fileDetails="file"/>
  <br/>
  <DataSummary v-if="data" :data="data"/>
  <br/>
  <DataView v-if="data" :data="data.values"/>
</template>
