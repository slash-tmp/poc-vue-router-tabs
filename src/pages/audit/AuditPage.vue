<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAudits } from "../../stores/audits";

const route = useRoute();
const audits = useAudits();

// fetch page on load and audit/page change
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
    <div class="field">
      <label for="comment-input">Comment</label>
      <textarea id="comment-input" v-model="page.comment" rows="10" />
    </div>
  </template>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}

textarea {
  font: inherit;
}
</style>
