<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAudits } from "../../stores/audits";

const route = useRoute();
const audits = useAudits();

watch(
  [() => route.params.id, () => route.params.page],
  ([auditId, pageSlug]) => {
    audits.fetchPage(auditId as string, pageSlug as string);
  },
  { immediate: true },
);

const page = computed(
  () => audits.pages[`${route.params.id}/${route.params.page}`],
);
</script>

<template>
  <template v-if="page">
    <h3>{{ page.name }}</h3>
    <p>{{ page.comment }}</p>
  </template>
</template>
