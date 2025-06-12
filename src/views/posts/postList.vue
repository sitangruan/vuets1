<template>
  <div class="post-list-container">
    <h1 >This is Post List</h1>
    <a @click="gotoDetail(112)">Go to Post 112</a>
    <a @click="gotoDetail('abc')">Go to Post abc <span class='text-red-500'>(Illegal ID...)</span></a>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router';

  const gotoDetail = (toGoId: string | number) => {
    router.push({ name: 'Post-Details', params: { id: toGoId } });
  };
</script>

<style scoped>
  @import "tailwindcss";

  .post-list-container {
    @apply flex flex-col items-center w-full h-full p-4;

    h1 {
      @apply text-3xl font-bold mb-4 mr-10;
    }

    a {
      @apply text-blue-500 hover:underline cursor-pointer text-2xl;
    }
  }
</style>
