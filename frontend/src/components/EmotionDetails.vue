<template>
  <div
    class="emotion-card column items-center bg-accent q-pa-md"
    style="width: 100%"
  >
    <p class="text-white text-weight-light q-ma-none text-h4">
      {{ emotion }} - {{ percentage }}%
    </p>
  </div>
</template>

<script setup lang="ts">
export interface EmotionDetailsProps {
  emotion: string;
  percentage: number;
}

defineProps<EmotionDetailsProps>();
</script>

<style lang="scss">
.emotion-card {
  border-radius: 10px;
}
</style>
