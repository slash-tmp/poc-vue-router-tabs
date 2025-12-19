<script setup lang="ts">
import { useRoute } from "vue-router";
import SimpleTabs, { type TabItem } from "../../components/SimpleTabs.vue";

const tabs: TabItem[] = [
  { label: "Éléments transverses", to: "/audit/1234/elements-transverses" },
  { label: "Accueil", to: "/audit/1234/accueil" },
  { label: "Contact", to: "/audit/1234/contact" },
  { label: "Notes" },
];

const route = useRoute();
</script>

<template>
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
