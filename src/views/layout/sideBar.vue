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
    @apply flex flex-col max-md:flex-row max-md:w-full bg-gray-100 w-50 shadow-[0px_2px_6px_0px_rgba(60,_73,_112,_0.25)];

    a {
      @apply no-underline;
    }

    .menuItem {
      @apply h-15 max-md:h-10 max-md:flex-1 cursor-pointer border-b-1 max-md:border-none max-md:text-base max-md:p-2 border-[#112442] text-xl flex justify-center items-center transition-all duration-300 ease-in-out;
      &:hover, &.isFocused {
        @apply bg-[#a9c5d4];
      }
    }
  }
</style>
