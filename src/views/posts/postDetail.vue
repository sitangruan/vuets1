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
      <p class="author-info">by: {{ postsStore.currentPost.userName || 'Unknown User' }} ({{ postsStore.currentPost.email }})</p>
      <div class="new-comment">
        <textarea
          v-model="currentComment"
          class="body"
          placeholder="Add your comment..."
          @input="isDirty = true"
        ></textarea>
        <button
          class="submit-button"
          @click="saveComment"
          :disabled="!currentComment.trim() || !isDirty"
        >Submit</button>
      </div>
      <div class="comment-list" v-if="postsStore.currentPost.comments && postsStore.currentPost.comments.length > 0">
        <h3>Comments:</h3>
        <div
          v-for="comment in postsStore.currentPost.comments"
          :key="comment.id"
          class="comment-item"
        >
          <p class="comment-author">{{ comment.name }} (<span class="author-email">{{ comment.email }}</span>)</p>
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
  import { limits } from '@/common/constants';
  const route = useRoute();

  const currentComment = ref('');
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

  async function saveComment() {
    if (currentComment.value.trim() && isDirty.value) {
      try {
        // Validate the comment length
        if (currentComment.value.length > limits.maxCommentLength) {
          alert(`Comment is too long. Please limit it to ${limits.maxCommentLength} characters.`);
          return;
        }

        await postsStore.addCommentToPost(postsStore.currentPostId, currentComment.value);
        currentComment.value = '';
        isDirty.value = false;
      } catch (error) {
        console.error('Error saving comment: ', error);
        alert('Failed to save comment. Please try again later. (This is faked mock error to purposely fail randomly. Just try again.)');
      }
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
      @apply flex flex-col items-start w-full h-[calc(100vh-16rem)] p-4 bg-gray-100 rounded-lg shadow-md overflow-y-auto;

      .title {
        @apply text-xl font-bold mb-2;
      }

      .body {
        @apply text-base text-gray-700;
      }

      .author-info {
        @apply text-sm text-gray-500 mt-2;
      }

      button.submit-button {
        @apply mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed;
      }

      .new-comment {
        @apply mt-4 w-full;

        textarea {
          @apply w-full h-24 p-2 border border-gray-300 rounded-lg resize-none;
        }
      }

      .comment-list {
        @apply mt-4 w-full;

        .comment-item {
          @apply mb-2 p-2 bg-white rounded-lg shadow-sm;

          .comment-author {
            @apply font-semibold text-gray-800;

            .author-email {
              @apply text-gray-500;
            }
          }

          .comment-body {
            @apply text-gray-600;
          }
        }
      }
    }
  }
</style>
