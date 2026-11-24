<script setup lang="ts">
defineProps<{ id: string; index: string; title: string }>()
</script>

<template>
  <header class="section__head">
    <span class="label">{{ index }}</span>
    <h2 :id="id" class="section__title">{{ title }}</h2>
  </header>
</template>
