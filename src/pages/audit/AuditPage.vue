<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <h3>Page #{{ route.params.page }}</h3>
  <p>{{ route.fullPath }}</p>
</template>
