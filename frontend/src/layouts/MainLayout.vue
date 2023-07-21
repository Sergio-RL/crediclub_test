<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <h4 class="q-ma-md text-white text-weight-light">
          Detector de emociones
        </h4>
      </q-toolbar>
      <hr class="text-accent" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style lang="scss">
h4 {
  color: #242424;
}
</style>
