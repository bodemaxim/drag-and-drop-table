<script setup lang="ts">
import { defineProps } from 'vue'

interface IProps {
  /**
   * Открытая страница.
   * @type {string}
   */
  page: string
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="section">
    <nav class="navbar">
      <router-link to="/general" class="navbar-item" :class="{ general: props.page === 'general' }"
        >Общее</router-link
      >
      <router-link to="/" class="navbar-item" :class="{ products: props.page === 'products' }"
        >Товары</router-link
      >
      <router-link
        to="/expenses"
        class="navbar-item"
        :class="{ expenses: props.page === 'expenses' }"
        >Доп. расходы</router-link
      >
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
}

.navbar-item {
  color: blue;
  text-decoration: none;
  margin: 15px;
}

.navbar-item:hover {
  text-decoration: underline;
}

.general,
.products,
.expenses {
  color: black;
}
</style>
