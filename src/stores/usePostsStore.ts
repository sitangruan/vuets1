// The store for managing posts

import { defineStore } from 'pinia';
import { apiUrls } from '../common/urls';
import type { PostElement } from '@/modals/PostElement';

export const usePostsStore = defineStore('post', {
  state: () => ({
    posts: [] as PostElement[],
    isLoading: false,
  }),
  actions: {
    async fetchPosts() {
      this.isLoading = true;

      try {
        const response = await fetch(apiUrls.posts);
        this.posts = await response.json();
        console.log("Posts fetched successfully:", this.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
