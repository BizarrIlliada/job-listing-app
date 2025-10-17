<template>
  <button class="ui-button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.ui-button {
  padding-block: 8px;
  padding-inline: 16px;
  font-size: 16px;
  box-shadow: var(--block-outer-shadow);
  background-color: var(--orange-10);
  border: 1px solid var(--gray-100);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color .3s ease;

  &:hover {
    background-color: var(--orange-25);
  }
}
</style>
