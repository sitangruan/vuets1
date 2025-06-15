// The store for managing posts

import { defineStore } from 'pinia';
import { apiUrls } from '../common/urls';
import type { UserElement } from '@/modals/UserElement';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as UserElement[],
    isLoading: false,
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;

      try {
        const response = await fetch(apiUrls.users);
        this.users = (await response.json()) as UserElement[];
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
