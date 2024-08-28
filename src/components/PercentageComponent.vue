<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const percentage = computed(() => Math.round((props.count * 100) / props.total))
const label = computed(() => `${props.count} / ${props.total}`)
</script>

<template>
  <div style="font-size: x-small; text-align: center">{{ label }}</div>
  <ProgressBar :value="percentage" />
</template>
