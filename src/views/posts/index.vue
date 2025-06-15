<template>
  <div class="posts-root-container">
    <h1>Posts</h1>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useUsersStore } from '@/stores/useUsersStore';
  import { usePostsStore } from '@/stores/usePostsStore';

  const usersStore = useUsersStore();
  const postsStore = usePostsStore();

  onMounted(() => {
    usersStore.fetchUsers();
    postsStore.fetchPosts();
  });
</script>

<style scoped>
  @import "tailwindcss";

  .posts-root-container {
    @apply flex flex-col flex-1 h-full p-4;

    h1 {
      @apply text-3xl font-bold;
    }
  }
</style>
