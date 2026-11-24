<script setup lang="ts">
defineProps<{ items: { q: string; a: string }[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="(item, i) in items" :key="i" class="faq__item">
      <summary class="faq__q">
        <span>{{ item.q }}</span>
        <span class="faq__icon" aria-hidden="true" />
      </summary>
      <p class="faq__a">{{ item.a }}</p>
    </details>
  </div>
</template>
