<script setup lang="ts">
  import { linkedInUrl, sourceCodesUrl } from './common/constants';
  import SideBar from './views/layout/sideBar.vue';
</script>
<template>
  <header>
    <div class='titlePart'>
      <a :href='linkedInUrl' target='_blank'><img src='/sitangCircle.png' title='Sitang Ruan'/></a>
      <div class='title'>Sitang Vue Demo 1</div>
    </div>
    <a :href='sourceCodesUrl' target='_blank'>{{sourceCodesUrl}}</a>
  </header>
  <main>
    <SideBar></SideBar>
    <router-view></router-view>
  </main>
</template>

<style scoped>
  @import "tailwindcss";

  header {
    @apply flex max-md:flex-col max-md:justify-center justify-between items-center border-b-1 border-slate-500 pl-5 font-bold w-full h-20 max-md:h-18 max-md:justify-around box-border;
    .titlePart {
      @apply flex items-center;

      img {
        @apply w-10 cursor-pointer
      }

      .title {
        @apply text-3xl max-md:text-xl;
      }
    }
    a {
      @apply text-2xl max-md:text-base underline pr-4 text-blue-300 cursor-pointer;
    }
  }

  main {
    @apply flex h-[calc(100vh-80px)] max-md:h-[calc(100vh-60px)] max-md:flex-col w-full;
  }
</style>
