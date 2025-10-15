<template>
  <div class="ui-loader">
    <div class="ui-loader__spinner">

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.ui-loader {
  min-height: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__spinner {
    border: 8px solid var(--gray-50);
    border-left-color: var(--gray-10);
    border-radius: 50%;
    width: 64px;
    height: 64px;
    animation: rotating .5s alternate-reverse infinite;
  }
}
</style>
