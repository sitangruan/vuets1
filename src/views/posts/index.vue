<template>
  <div class="posts-root-container">
    <h1>Posts</h1>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  @import "tailwindcss";

  .posts-root-container {
    @apply flex flex-col items-center flex-1 h-full p-4;

    h1 {
      @apply text-3xl font-bold mb-4;
    }
  }
</style>
