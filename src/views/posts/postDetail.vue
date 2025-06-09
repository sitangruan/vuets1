<template>
  <div class="post-details-container">
    <h1>This is Post Detail. The post id is <span class="param-id">{{ route.params.id }}</span></h1>
    <a @click="gotoList">Go back to List</a>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
  import router from '@/router'
  const route = useRoute();
    const gotoList = () => {
      router.push({ name: 'Post-List' });
    }
</script>

<style scoped>
  @import "tailwindcss";

  .post-details-container {
    @apply flex flex-col items-center w-full h-full p-4;

    h1 {
      @apply text-3xl font-bold mb-4;

      .param-id {
        @apply font-bold text-blue-500 italic text-3xl;
      }
    }

    a {
      @apply text-blue-500 hover:underline cursor-pointer text-2xl;
    }
  }
</style>
