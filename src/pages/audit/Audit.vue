<script setup lang="ts">
import SimpleTabs, { type TabItem } from "../../components/SimpleTabs.vue";

const tabs: TabItem[] = [
  { label: "Éléments transverses", to: "/audit/elements-transverses" },
  { label: "Accueil", to: "/audit/accueil" },
  { label: "Contact", to: "/audit/contact" },
  { label: "Notes" },
];
</script>

<template>
  <h2>Audit page</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum labore ut
    ex, excepturi doloremque maiores ipsa inventore a in consequatur accusamus
    harum ipsam dolorem officiis pariatur, tenetur asperiores odio doloribus?
  </p>

  <SimpleTabs :tabs="tabs">
    <RouterView />
  </SimpleTabs>
</template>
