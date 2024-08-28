<script setup>
import { computed } from 'vue'

const props = defineProps({
  fileDetails: {
    type: Object,
    required: true
  }
})

const lastModified = computed(() => props.fileDetails.lastModified.toLocaleString())
const size = computed(() => props.fileDetails.size)
const type = computed(() => props.fileDetails.type)
</script>

<template>
  <div>
    <Tag icon="pi pi-clock" severity="info" :value="`Last Modified: ${lastModified}`"></Tag> &nbsp;
    <Tag icon="pi pi-info-circle" severity="info" :value="`Size: ${size}`"></Tag> &nbsp;
    <Tag icon="pi pi-file" severity="info" :value="`Type: ${type}`"></Tag>
  </div>
</template>
