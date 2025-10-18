<template>
  <div ref="multiselectRef" class="ui-dropdown" :class="{ 'ui-dropdown--disabled': disabled, }">
    <div
      class="ui-dropdown__head"
      :class="{
        'ui-dropdown__head--opened': isOpen,
        'ui-dropdown__head--disabled': disabled,
        'ui-dropdown__head--with-selected': modelValue.length > 0,
      }"
      @click="emit('update:isOpen', !isOpen)"
    >
      <span class="ui-dropdown__name">
        {{ name }}
      </span>

      <IconAngleDown />
    </div>

    <Transition name="multiselect-overlay">
      <div
        ref="multiselectOverlayRef"
        v-show="isOpen && !disabled"
        class="ui-dropdown__body"
        :style="floatingStyles"
        @click.stop
      >
        <div
          class="ui-dropdown__option"
          :class="{ 'ui-dropdown__option--selected': modelValue.length === 0 }"
          @click="onSelectAll"
        >
          <span class="ui-dropdown__option-label">
            {{ t('shared.allValues') }}
          </span>
        </div>

        <div
          v-for="option in dropdownOptions"
          :key="option.value"
          class="ui-dropdown__option"
          :class="{ 'ui-dropdown__option--selected': isOptionSelected(option) }"
          @click="onSelectOption(option)"
        >
          <span class="ui-dropdown__option-label">
            {{ option.label }}
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import IconAngleDown from '../icons/IconAngleDown.vue';

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { onClickOutside } from '@vueuse/core';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
} from '@floating-ui/vue';

import type { IDropdownOption } from '@/types';

interface Props {
  name: string;
  dropdownOptions: IDropdownOption[];
  modelValue?: IDropdownOption[];
  isOpen?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: (): IDropdownOption[] => [],
  isOpen: false,
  disabled: false,
});

const emit = defineEmits<{
  (emitEvent: 'update:modelValue', value: IDropdownOption[]): void;
  (emitEvent: 'update:isOpen', value: boolean): void;
  (emitEvent: 'onSelectAll'): void;
}>();

const { t } = useI18n();

const multiselectRef = ref<HTMLElement | null>(null);
const multiselectOverlayRef = ref<HTMLElement | null>(null);

const { floatingStyles } = useFloating(multiselectRef, multiselectOverlayRef, {
  placement: 'bottom-start',
  middleware: [
    offset(8),
    flip({
      fallbackPlacements: ['bottom-end'],
    }),
  ],
  whileElementsMounted: autoUpdate,
});

function onSelectAll() {
  emit('onSelectAll');
}

function onSelectOption(option: IDropdownOption) {
  let checkedOptions: IDropdownOption[] = [];

  if (isOptionSelected(option)) {
    checkedOptions = [...props.modelValue.filter(currentOption => currentOption.value !== option.value)];
  } else {
    checkedOptions = [...props.modelValue, option];
  }

  emit('update:modelValue', checkedOptions);
}

function isOptionSelected(option: IDropdownOption): boolean {
  return props.modelValue.some(selected => selected.value === option.value);
}

onClickOutside(multiselectRef, () => {
  if (props.isOpen) {
    emit('update:isOpen', false);
  }
});
</script>

<style lang="scss">
.ui-dropdown {
  position: relative;
  width: min-content;

  &--disabled {
    pointer-events: none;
  }

  &__head {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 13px 20px;
    border: 1px solid var(--gray-100);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color .3s ease, border-color .3s ease;

    &:hover {
      background-color: var(--green-10);
      border-color: transparent;
    }

    svg {
      height: 16px;
      width: 16px;
      transition: transform .3s ease;
    }

    &--opened {
      svg {
        transform: rotateZ(-180deg);
      }
    }

    &--opened,
    &--with-selected {
      background-color: var(--green-25);
      border-color: transparent;

      &:hover {
        background-color: var(--green-25);
      }
    }

    &--disabled {
      color: var(--gray-25);
      background-color: var(--gray-10);
      border-color: transparent;
    }
  }

  &__name {
    white-space: nowrap;
    text-transform: uppercase;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    width: max-content;
    min-width: 100%;
    max-width: min(200%, calc(100vw - 2 * 20px));
    overflow-y: auto;
    overflow-x: clip;
    padding: 16px;
    border-radius: 8px;
    background-color: var(--white);
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.10);
    z-index: 1;
  }

  &__option {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 8px 12px;
    border: 1px solid var(--gray-100);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color .3s, border-color .3s, color .3s;

    &:hover {
      background-color: var(--green-10);
      border-color: transparent;
    }

    &--selected,
    &--selected:hover {
      color: var(--gray-100);
      background-color: var(--green-25);
      border-color: transparent;
    }
  }
}
</style>
