<template>
  <q-page class="content row justify-center">
    <div class="row justify-center" style="width: 70vw">
      <div class="col-12 col-md-5">
        <photo-container
          :photo="photo"
          :on-click-img="onClickImg"
        ></photo-container>
        <input v-show="false" type="file" @change="handlePhoto" />
      </div>

      <div class="column col-12 col-md-7 items-center">
        <h3 class="text-center text-white text-weight-light">
          Emociones detectadas
        </h3>
        <emotion-details
          v-for="({ emotion, percentage }, i) in detectedEmotions"
          :key="i"
          :emotion="emotion"
          :percentage="percentage"
          class="q-mb-xl"
        ></emotion-details>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { AxiosResponse } from 'axios';
import { sortBy } from 'lodash';

import EmotionDetails, {
  EmotionDetailsProps,
} from 'components/EmotionDetails.vue';
import PhotoContainer from 'components/PhotoContainer.vue';
import { api } from 'src/boot/axios';

const $q = useQuasar();
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
  const res: AxiosResponse = await api.post('emotion-detector/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.emotions as EmotionDetailsProps[];
};

const onLoad = (e: ProgressEvent<FileReader>) => {
  const result = e?.target?.result as ArrayBuffer;
  if (!!detectedEmotions.value.length) {
    photo.value = window.URL.createObjectURL(
      new Blob([new Uint8Array(result)], { type: 'image/jpg' })
    );
  } else {
    $q.dialog({ message: 'La imagen debe contener el rostro de una persona.' });
    photo.value = '';
  }
};

const handlePhoto = async () => {
  $q.loading.show();
  const fileInput: HTMLInputElement | null =
    document.querySelector('input[type=file]');

  if (!!fileInput?.files) {
    const file = fileInput.files[0];
    const emotions = await uploadPhoto(file);
    const reader = new FileReader();

    reader.addEventListener('load', onLoad);
    detectedEmotions.value = sortBy(emotions, ['percentage']).reverse();
    reader.readAsArrayBuffer(file as Blob);
    $q.loading.hide();
  }
  $q.loading.hide();
};
</script>

<style lang="scss">
.content {
  background-color: #132d46;
}

img {
  width: 90%;
  border-radius: 1em;
}

@media (max-width: 1023px) {
  img {
    width: 350px;
  }
}
</style>
