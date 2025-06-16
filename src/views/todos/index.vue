<template>
  <div class="todos-root-container">
    <h1>Todos</h1>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  @import "tailwindcss";

  .todos-root-container {
    @apply flex flex-col flex-1 h-full p-4;

    h1 {
      @apply text-3xl font-bold;
    }
  }
</style>
