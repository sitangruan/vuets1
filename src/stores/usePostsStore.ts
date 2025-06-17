// The store for managing posts

import { defineStore } from 'pinia';
import apicaller from '../api/apiCaller';
import type { PostFullElement } from '@/modals/PostElement';
import { defaultPostsSortingInfo } from '@/common/constants';
import { useUsersStore } from '@/stores/useUsersStore';
import type { CommentElement } from '@/modals/CommentElement';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as PostFullElement[],
    currentPostId: 0,
    isLoading: false,
    sortingField: defaultPostsSortingInfo,
  }),
  actions: {
    async fetchPosts() {
      this.isLoading = true;

      try {
        this.posts = (await apicaller.posts.getPosts()) as PostFullElement[];
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getPostDetails(postId: number) {
      if (!Number.isInteger(postId) || !(postId > 0)) {
        throw new Error("Invalid post ID. Please enter a valid integer greater than 0.");
      }

      this.isLoading = true;

      try {
        const comments = (await apicaller.posts.getPostComments(postId)) as CommentElement[];
        const foundPost = this.posts.find(post => post.id === postId);
        if (foundPost) {
          // Attach comments to the post
          foundPost.comments = comments;
        }
      } catch (error) {
        console.error("Error fetching post comments:", error);
        throw error; // Re-throw the error to handle it in the component
      } finally {
        this.isLoading = false;
      }
    },
    doSorting(field: string) {
      if (this.sortingField.sortBy === field) {
        // If the field is already sorted, toggle the order
        this.sortingField.sortOrder = this.sortingField.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // Otherwise, set the new sorting field and default to ascending order
        this.sortingField = {
          sortBy: field,
          sortOrder: 'asc',
        };
      }
    },
    setCurrentPostId(postId: number) {
      if (!Number.isInteger(postId) || !(postId >= 0)) {
        throw new Error("Invalid post ID. Please enter a valid integer greater than or equal to 0.");
      }
      this.currentPostId = postId;
    }
  },
  getters: {
    sortedFullPosts (state): PostFullElement[] {
      const usersStore = useUsersStore();
      if (!state.posts || state.posts.length === 0) {
        return [];
      }

      const fullList = (usersStore.users && usersStore.users.length > 0) ? state.posts.map(post => {
        const foundUser = usersStore.users.find(user => user.id === post.userId);
        const foundUserName = foundUser ? foundUser.name : 'Unknown User';
        const foundUserEmail = foundUser ? foundUser.email : 'Unknown Email';

        return {
            ...post,
            user: foundUser || null,
            userName: foundUserName,
            email: foundUserEmail
          };
        }) as PostFullElement[] : state.posts.map(post => ({
          ...post,
          user: null,
          userName: 'Unknown User',
          email: 'Unknown Email'
        })) as PostFullElement[];

      // Sort the full list by the sorting field
      fullList.sort((a, b) => {
        const field = state.sortingField.sortBy as keyof PostFullElement;
        const order = state.sortingField.sortOrder === 'asc' ? 1 : -1;
        if (a[field] == null && b[field] == null) return 0;
        if (a[field] == null) return -1 * order;
        if (b[field] == null) return 1 * order;
        if (a[field] < b[field]) return -1 * order;
        if (a[field] > b[field]) return 1 * order;
        return 0;
      });

      return fullList;
    },
    currentPost(state): PostFullElement | null {
      if (state.currentPostId <= 0) {
        return null;
      }
      return state.posts.find(post => post.id === state.currentPostId) || null;
    }
  },
});
