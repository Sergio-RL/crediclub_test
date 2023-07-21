<template>
  <div class="column items-center q-mt-xl">
    <img v-if="!!photo" class="mainPhoto" :src="photo" />
    <img v-else class="mainPhoto" src="../assets/no_image.png" />
    <p class="label text-center text-white q-pa-md" @click="onClickImg">
      (Haz click aquí para subir una fotografía.)
    </p>
  </div>
</template>

<script setup lang="ts">
interface PhotoContainerProps {
  photo: string;
  onClickImg: (event: MouseEvent) => void;
}

defineProps<PhotoContainerProps>();
</script>

<style lang="scss">
.label {
  cursor: pointer;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.025);
  }
}
</style>
