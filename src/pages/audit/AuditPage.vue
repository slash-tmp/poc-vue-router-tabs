<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <h3>Audit page</h3>
  <p>{{ route.fullPath }}</p>
</template>
