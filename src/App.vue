<template>
  <AppHeader />

  <main class="app-main">
    <div class="container">
      <RouterView />
    </div>
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}

.app-main {
  display: flex;
  flex-grow: 1;
  padding: 32px 0;
}
</style>
