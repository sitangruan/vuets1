import { defineStore } from 'pinia';
import { useUsersStore } from '@/stores/useUsersStore';
import { usePostsStore } from './usePostsStore';

export const useGlobalStore = defineStore('global', {
  getters: {
    isLoading () {
      const usersStore = useUsersStore();
      const postsStore = usePostsStore();
      return usersStore.isLoading || postsStore.isLoading;
    },
    isShowSpinner () {
      return true;
    },
    isMaskTransparent () {
      return true;
    },
  },
});
