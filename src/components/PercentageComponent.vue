<script setup>
import ProgressBar from "primevue/progressbar";
import {computed} from "vue";

const props = defineProps({
  count: {
    required: true
  },
  total: {
    required: true
  }
})

const percentage = computed(() => Math.round(props.count * 100 / props.total))
const label = computed(() => `${props.count} / ${props.total}`)
</script>

<template>
  <div style="font-size: x-small; text-align: center">{{ label }}</div>
  <ProgressBar :value="percentage"/>
</template>
