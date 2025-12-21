<script setup lang="ts">
import { ref, useId, useTemplateRef } from "vue";
import {
  RouterLink,
  type RouteLocationRaw,
} from "vue-router";

export interface TabItem {
  label: string;
  /** If present, the tab is rendered as a `<RouterLing>` */
  to?: RouteLocationRaw;
}

const props = defineProps<{
  tabs: TabItem[];
}>();

const selectedTabIndex = ref<number>(0);
const tabButtonsRef =
  useTemplateRef<Array<HTMLButtonElement | InstanceType<typeof RouterLink>>>(
    "tab-button",
  );

const uniqueId = useId();

const emit = defineEmits<{
  (e: "selectedTabChange", selectedTabIndex: number): void;
}>();

function tabId(i: number) {
  return `tab-${uniqueId}-${i}`;
}

function panelId(i: number) {
  return `panel-${uniqueId}-${i}`;
}

function selectTab(i: number) {
  if (i === selectedTabIndex.value) {
    return;
  }

  selectedTabIndex.value = i;

  // tab can be buttons or RouterLink, the focusable element is either
  // the tab itself (if it’s a button) or tab.$el (if it’s a RouterLink)
  const tab = tabButtonsRef.value?.[i];
  const focusElement: HTMLButtonElement | HTMLAnchorElement | undefined =
    (tab as any)?.$el ?? tab;

  // Focus the new tab element
  focusElement?.focus();
}

function selectNextTab() {
  selectTab((selectedTabIndex.value + 1) % props.tabs.length);
}

function selectPreviousTab() {
  const len = props.tabs.length;
  selectTab((selectedTabIndex.value - 1 + len) % len);
}

function selectFirstTab() {
  selectTab(0);
}

function selectLastTab() {
  selectTab(props.tabs.length - 1);
}

defineExpose({
  selectTab
})
</script>

<template>
  <div class="tabs-wrapper">
    <ul role="tablist" class="tabs">
      <li v-for="(tab, i) in tabs" :key="i" role="presentation">
        <component
          :is="tab.to ? RouterLink : 'button'"
          :id="tabId(i)"
          ref="tab-button"
          role="tab"
          class="tab-button"
          :to="tab.to"
          :aria-controls="i === selectedTabIndex ? panelId(i) : undefined"
          :aria-selected="i === selectedTabIndex ? 'true' : 'false'"
          :tabindex="i === selectedTabIndex ? undefined : '-1'"
          @click="selectTab(i)"
          @keydown.right.down.prevent="selectNextTab"
          @keydown.left.up.prevent="selectPreviousTab"
          @keydown.home.prevent="selectFirstTab"
          @keydown.end.prevent="selectLastTab"
        >

          {{ tab.label }}
        </component>
      </li>
    </ul>
  </div>
  <div class="panel-container">
    <div
      :id="panelId(selectedTabIndex)"
      :aria-labelledby="tabId(selectedTabIndex)"
      role="tabpanel"
      tabindex="0"
    >
      <slot :selected-tab-index="selectedTabIndex"/>
    </div>
  </div>
</template>

<style scope>
.tabs {
  display: flex;
  list-style: none;
  padding: 0;
  gap: 1rem;

  li {
    display: flex;
  }
}

.tab-button {
  background: none;
  border: 2px solid #fff4;
  padding: 0.25rem 1rem;
  font-size: inherit;
  color: inherit;
  text-decoration: none;

  &[aria-selected="true"] {
    border-color: currentColor;
  }
}

.panel-container {
  border: 1px solid white;
  padding: 1rem;
}
</style>
