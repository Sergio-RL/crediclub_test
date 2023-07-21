<template>
  <q-page class="content row justify-center">
    <div class="row justify-center" style="width: 70vw">
      <div class="col-12 col-md-6">
        <div class="column items-center q-mt-xl" @click="onClickImg">
          <img v-if="!!photo" class="mainPhoto" :src="photo" />
          <img v-else class="mainPhoto" src="../assets/no_image.png" />
          <p class="text-center text-white">
            (Haz click en la foto <br />
            para escanear)
          </p>
        </div>

        <input v-show="false" type="file" @change="handlePhoto" />
      </div>

      <div class="column col-12 col-md-6 items-center">
        <h3 class="col-12 text-center text-white text-weight-light">
          Emociones detectadas
        </h3>
        <div class="col-10">
          <emotion-details
            v-for="({ emotion, percentage }, i) in detectedEmotions"
            :key="i"
            :emotion="emotion"
            :percentage="percentage"
            class="q-mb-xl"
          ></emotion-details>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AxiosResponse } from 'axios';
import { sortBy } from 'lodash';

import EmotionDetails, {
  EmotionDetailsProps,
} from 'components/EmotionDetails.vue';
import { api } from 'src/boot/axios';

const photo = ref<string>('');
const detectedEmotions = ref<EmotionDetailsProps[]>([]);

const onClickImg = () => {
  const input: HTMLInputElement | null =
    document.querySelector('input[type=file]');
  detectedEmotions.value = [];
  photo.value = '';
  input?.click();
};

const uploadPhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('photo', file);
  const res: AxiosResponse = await api.post('cognitive/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.emotions as EmotionDetailsProps[];
};

const onLoad = (e: ProgressEvent<FileReader>) => {
  const result = e?.target?.result as ArrayBuffer;
  photo.value = window.URL.createObjectURL(
    new Blob([new Uint8Array(result)], {
      type: 'image/jpg',
    })
  );
};

const handlePhoto = async () => {
  const fileInput: HTMLInputElement | null =
    document.querySelector('input[type=file]');

  if (!!fileInput?.files) {
    const file = fileInput.files[0];
    const emotions = await uploadPhoto(file);
    const reader = new FileReader();

    reader.addEventListener('load', onLoad);
    reader.readAsArrayBuffer(file as Blob);
    detectedEmotions.value = sortBy(emotions, ['percentage']).reverse();
  }
};
</script>

<style lang="scss">
.content {
  background-color: #132d46;
}

img {
  cursor: pointer;
  width: 80%;
  border-radius: 1em;
}
</style>
