<template>
  <footer class="app-footer">
    <span class="app-footer__copyright">
      © Illiada {{ currentYear }}
    </span>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style lang="scss">
.app-footer {
  height: var(--footer-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green-10);
  box-shadow: var(--block-inner-shadow);

  &__copyright {
    color: var(--gray-75);
  }
}
</style>