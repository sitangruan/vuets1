<template>
  <div class="post-list-container">
    <div class="header-row">
      <div
          v-for="col in postsGridColumns"
          :key="col.field"
          class="col-header"
          :class="col.className"
          @click="postsStore.doSorting(col.field)"
        >
          <div>
            {{ col.label }}
          </div>
          <div
            class="empty-icon"
            :class="[col.field === postsStore.sortingField.sortBy ? 'sort-icon' : '', postsStore.sortingField.sortOrder === 'desc' ? 'desc' : '']"
          ></div>
      </div>
    </div>
    <div class="solid-rows-container">
      <div
        v-for="(post, index) in postsStore.sortedFullPosts"
        :key="post.id"
        class="row"
        :class="{ 'odd-row': index % 2 === 1 }"
      >
        <div class="cell col-title">
          <span @click="gotoDetail(post.id)" class="goto-link ellipsis-text">{{ post.title }}</span>
        </div>
        <div class="cell col-body">
          <span class="ellipsis-text">{{ post.body }}</span>
        </div>
        <div class="cell col-username">
          <span class="ellipsis-text">{{ post.userName || 'Unknown User' }}</span>
        </div>
        <div class="cell col-email">
          <span class="ellipsis-text">{{ post.email }}</span>
        </div>
      </div>
    </div>
    <div v-if="postsStore.sortedFullPosts.length === 0" class="empty-content">
      No posts available.
    </div>
  </div>
  <div class="post-list-container-mobile">
    <ul>
      <li v-for="post in postsStore.sortedFullPosts" :key="post.id">
        <a @click="gotoDetail(post.id)">{{ post.title }}</a>
        <div class="text-gray-500 text-sm">{{ post.body }}</div>
        <div v-if="post.userName" class="text-gray-400 text-xs">by {{ post.userName }} ({{ post.email }})</div>
        <div v-else class="text-gray-400 text-xs">by Unknown User</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { usePostsStore } from '@/stores/usePostsStore';
  import { postsGridColumns } from '@/common/constants';

  const postsStore = usePostsStore();

  const gotoDetail = (toGoId: string | number) => {
    router.push({ name: 'Post-Details', params: { id: toGoId } });
  };
</script>

<style scoped>
  @import "tailwindcss";


  a, .goto-link {
    @apply text-blue-500 hover:underline cursor-pointer;
  }

  .ellipsis-text {
    @apply text-ellipsis overflow-hidden whitespace-nowrap;
  }

  .post-list-container {
    @apply flex flex-col items-center w-full h-full p-4 overflow-y-auto hidden md:block;

    .header-row {
      @apply flex w-full justify-between gap-1 h-10 flex-[0_0_basis] shadow-[0px_2px_6px_0px_rgba(60,_73,_112,_0.25)];

      .col-header {
        @apply flex justify-center items-center cursor-pointer font-bold bg-gray-200;

        .empty-icon {
          @apply w-4 h-4 ml-3;
        }

        .sort-icon {
          @apply flex w-4 h-4 ml-3 bg-[url(../../assets/images/sorting.png)] bg-cover;
        }

        .desc {
          @apply rotate-[180deg];
        }
      }
    }

    .col-username, .col-username-header, .col-email, .col-email-header {
      @apply w-[15%];
    }

    .col-title, .col-title-header {
      @apply w-[25%];
    }

    .col-body, .col-body-header {
      @apply w-[45%];
    }


    .solid-rows-container {
      @apply max-h-[calc(100vh-20rem)] min-h-75 overflow-y-auto;

      .row {
        @apply flex flex-1 h-10;

        .cell {
          @apply flex h-8 items-center pl-4;

          .ellipsisText {
            @apply inline-block overflow-hidden whitespace-nowrap text-ellipsis;
          }
        }
      }

      .row:hover {
        @apply bg-[#0000001a];
      }

      .odd-row {
        @apply bg-[#0000000a];
      }
    }

    .empty-content {
      @apply flex flex-1 max-h-160 min-h-75 justify-center items-center flex-col font-bold text-2xl;
    }
  }

  .post-list-container-mobile {
    @apply flex flex-col items-center w-full h-[calc(100vh-15rem)] p-4 overflow-y-auto block md:hidden;

    li {
      @apply border-b-1 border-gray-300 py-2;
    }
  }
</style>
