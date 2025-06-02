<template>
  <div class='side'>
    <RouterLink
      v-for='item in routeList'
      :key='item.id'
      :to='item.route'
      class='menuItem'
      active-class='isFocused'>
      {{ item.displayName }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { routeList } from '@/common/constants';

</script>

<style scoped>
  @import "tailwindcss";

  .side {
    @apply flex flex-col bg-gray-100 w-50 shadow-[0px_1px_6px_0px_rgba(60,_73,_112,_0.25)];

    a {
      @apply no-underline;
    }

    .menuItem {
      @apply h-15 cursor-pointer border-b-1 border-[#112442] text-xl flex justify-center items-center transition-all duration-300 ease-in-out;
      &:hover, &.isFocused {
        @apply bg-[#a9c5d4];
      }
    }
  }
</style>
