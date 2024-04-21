<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ProductsTab from '@/views/ProductsTab.vue'
/* import GeneralTab from '@/views/GeneralTab.vue'
import ExpensesTab from '@/views/ExpensesTab.vue' */
</script>

<template>
  <div class="main-page">
    <RouterView />
  </div>
</template>

<style scoped>
.main-page {
  height: 100vh;
  width: 100vw;
  background-color: #06080b;
}
</style>
