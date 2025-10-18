<template>
  <input
    class="ui-input"
    type="text"
    :value="modelValue"
    @input="onInput"
  >
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<style lang="scss">
.ui-input {
  width: 100%;
  padding: 13px 20px;
  border: 1px solid transparent;
  outline: none;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid var(--gray-100);
  border-radius: 4px;

  &::placeholder {
    color: var(--gray-50);
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
