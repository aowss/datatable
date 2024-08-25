<script setup>
import Analysis from '@/views/AnalysisView.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
</script>

<template>
  <div class="main-wrapper">
    <div class="main-container">
      <ThemeSwitcher />
      <div>
        <Analysis />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  max-width: 1448px;
  margin: 0 auto;
  padding: 5.5rem 6rem 3rem;
}
</style>
