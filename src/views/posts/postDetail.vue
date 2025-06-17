<template>
  <div class="post-details-container">
    <div class="top-row">
      <div class="back-link" @click="gotoList">
        <div class="icon"></div>
        <div>Back</div>
      </div>
    </div>
    <div class="details-content" v-if="postsStore.currentPost">
      <h2 class="title">{{ postsStore.currentPost?.title }}</h2>
      <p class="body">{{ postsStore.currentPost.body }}</p>
      <div class="comment-list" v-if="postsStore.currentPost.comments && postsStore.currentPost.comments.length > 0">
        <h3>Comments:</h3>
        <div
          v-for="comment in postsStore.currentPost.comments"
          :key="comment.id"
          class="comment-item"
        >
          <p class="comment-author">{{ comment.name }} ({{ comment.email }})</p>
          <p class="comment-body">{{ comment.body }}</p>
        </div>
      </div>
      <div v-else class="empty-content">
        No comments available for this post.
      </div>
    </div>
    <div v-else class="details-content">
      <p class="body">Loading post details...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
  import router from '@/router';
  import { usePostsStore } from '@/stores/usePostsStore';
  import { onMounted, ref } from 'vue';
  const route = useRoute();

  const isDirty = ref(false);
  const postsStore = usePostsStore();

  onBeforeRouteUpdate((to) => {
    if (isDirty.value) {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      );
      // cancel the navigation and stay on the same page
      if (!answer) {
        return false;
      }
    }

    // Reset the dirty state when updating the route
    isDirty.value = false;
    // Update the current post ID in the store
    updateCurrentPostId(Number(to.params.id));
  });

  onBeforeRouteLeave(() => {
    if (isDirty.value) {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      );
      // cancel the navigation and stay on the same page
      if (!answer) {
        return false;
      }
    }

    // Reset the dirty state when leaving the route
    isDirty.value = false;
    // Optionally, you can reset the current post ID in the store
    updateCurrentPostId(0);
  });

  const gotoList = () => {
    router.push({ name: 'Post-List' });
  };

  const updateCurrentPostId = (newId: number) => {
    postsStore.setCurrentPostId(newId);
    if (newId > 0) {
      postsStore.getPostDetails(newId);
    }
  };

  onMounted(() => {
    updateCurrentPostId(Number(route.params.id));
  });
</script>

<style scoped>
  @import "tailwindcss";

  .post-details-container {
    @apply flex flex-col items-center w-full h-full p-4;

    .top-row {
      @apply flex items-center w-full mb-4 shrink-0;

      .back-link {
        @apply text-blue-500 hover:underline cursor-pointer flex items-center text-xl;

        .icon {
          @apply flex w-6 h-6 mr-2 bg-[url(../../assets/images/backArrow.png)] bg-cover;
        }
      }
    }

    .details-content {
      @apply flex flex-col items-start w-full flex-1 p-4 bg-gray-100 rounded-lg shadow-md overflow-y-auto;

      .title {
        @apply text-2xl font-bold mb-2;
      }

      .body {
        @apply text-base text-gray-700;
      }

      .comment-list {
        @apply mt-4 w-full;

        .comment-item {
          @apply mb-2 p-2 bg-white rounded-lg shadow-sm;

          .comment-author {
            @apply font-semibold text-gray-800;
          }

          .comment-body {
            @apply text-gray-600;
          }
        }
      }
    }
  }
</style>
