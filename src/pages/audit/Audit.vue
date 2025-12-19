<script setup lang="ts">
import { useRoute } from "vue-router";
import SimpleTabs, { type TabItem } from "../../components/SimpleTabs.vue";
import { computed, onMounted, watch } from "vue";
import { useAudits } from "../../stores/audits";

// const tabs: TabItem[] = [
//   { label: "Éléments transverses", to: "/audit/1234/elements-transverses" },
//   { label: "Accueil", to: "/audit/1234/accueil" },
//   { label: "Contact", to: "/audit/1234/contact" },
//   { label: "Notes" },
// ];

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
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum labore ut
      ex, excepturi doloremque maiores ipsa inventore a in consequatur accusamus
      harum ipsam dolorem officiis pariatur, tenetur asperiores odio doloribus?
    </p>

    <SimpleTabs :tabs="tabs">
      <RouterView />
    </SimpleTabs>
  </template>
</template>
