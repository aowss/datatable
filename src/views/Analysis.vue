<script setup>
import {ref} from "vue";
import DataUpload from "@/components/DataUpload.vue";
import DataView from "@/components/DataView.vue";
import DataSummary from "@/components/DataSummary.vue";

const data = ref('')
const file = ref({})

const setData = (uploadedData) => data.value = uploadedData

const fileSelected = (metadata) => file.value = metadata
</script>

<template>
  <DataUpload @fileSelected="fileSelected" @dataUploaded="setData"/>
  <br/>
  <DataSummary v-if="data" :data="data" :fileDetails="file"/>
  <br/>
  <DataView v-if="data" :data="data.values"/>
</template>
