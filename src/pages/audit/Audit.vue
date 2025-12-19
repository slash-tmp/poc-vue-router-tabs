<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SimpleTabs, { type TabItem } from "../../components/SimpleTabs.vue";
import { computed, watch } from "vue";
import { useAudits } from "../../stores/audits";

const route = useRoute();
const audits = useAudits();

// fetch audit on page load and on subsequent page id changes
watch(
  () => route.params.id,
  (id) => {
    audits.fetchAudit(id as string);
  },
  { immediate: true },
);

const audit = computed(() => audits.audits[route.params.id as string]);

// when audit is loaded and there are no active page, navigate to first page
// /audit/xxx   =>   /audit/xxx/first-page
const router = useRouter();
watch(
  [audit, () => route.name],
  ([audit, routeName]) => {
    if (audit && routeName === "AuditRoot") {
      if (audit.pages[0]) {
        router.replace(`/audit/${route.params.id}/${audit.pages[0].slug}`);
      }
    }
  },
  { immediate: true },
);

const tabs = computed<TabItem[]>(() =>
  audit.value
    ? audit.value.pages.map(
        (page): TabItem => ({
          label: page.name,
          to: `/audit/${route.params.id as string}/${page.slug}`,
        }),
      )
    : [],
);
</script>

<template>
  <template v-if="audit">
    <h2>Audit #{{ route.params.id }}</h2>
  </template>

  <SimpleTabs :tabs="tabs">
    <RouterView />
  </SimpleTabs>
</template>
