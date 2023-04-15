<template>
  <q-page class="flex flex-center">
    <div class="col-11 q-mx-auto">
      <img src="/icons/HomePage/headline-bg.jpg" />
      <div class="headline-tag">
        <p class="neutral-50 text-5xl inter-b q-mb-none">Berlibur Hemat, Alam Semakin Cemerlang</p>
        <p class="neutral-50 text-lg inter-sb q-mb-none">Ajak teman-temanmu berlibur ke wisata alam ramah lingkungan
          dengan Traveleen, yang memungkinkan kamu membayar
          tiket masuk dengan poin yang sudah ditukar dengan sampah.</p>
      </div>
      <div class="search-home q-pa-auto">
        <q-form @submit="submit" class="row items-center justify-evenly">
          <div>
            <p class="inter-sb text-base neutral-500 q-mb-none">
              Lokasi
            </p>
            <q-input outlined round v-model="location" class="find input q-mt-sm" :rules="[(val) => !!val]" dense />
          </div>
          <div>
            <p class="inter-sb text-base neutral-500 q-mb-none">
              Jenis Wisata
            </p>
            <q-input outlined round v-model="type" class="q-mt-sm" :rules="[(val) => !!val]" dense />
          </div>
          <q-btn unelevated label="Cari" class="find-button text-base inter-sb" no-caps type="submit" />
        </q-form>
      </div>
      <p class="inter-b text-4xl neutral-900 q-mb-none q-mt-xl q-pt-xl text-center">#PeduliLingkungan</p>
      <div class="row justify-evenly items-center q-mt-xl">
        <q-card class="education-home">
          <q-img src="/icons/education.jpg" />
          <p class="inter-b text-xl neutral-900 q-mb-none q-pa-md">Liburan Seru di Wisata Alam Tanpa Merusak Lingkungan:
            Tips dan Trik</p>
        </q-card>
        <q-card class="education-home">
          <q-img src="/icons/education-2.jpg" />
          <p class="inter-b text-xl neutral-900 q-mb-none q-pa-md">Cara Memilah Sampah yang Benar: Membantu Mengurangi
            Beban Lingkungan</p>
        </q-card>
        <router-link to="/education">
          <q-icon name="img:/icons/HomePage/education-arrow.svg" size="72px" />
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HomePage',

  data() {
    return {
      location: ref(null),
      type: ref(null),
    };
  },

  methods: {
    submit() { }
  }

}
</script>

<style>
.find-button {
  height: 48px;
  width: 176px;
  color: white;
  background-color: #10B981;
}

.find-input {
  width: 260px;
}
</style>
