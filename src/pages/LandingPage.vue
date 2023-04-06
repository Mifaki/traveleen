<template>
  <q-page class="flex flex-center">
    <div class="col-11 q-mx-auto">
      <img src="/icons/LandingPage/headline-bg.jpg" />
      <div class="headline-tag">
        <p class="neutral-50 text-5xl inter-b q-mb-none">Berlibur Hemat, Alam Semakin Cemerlang</p>
        <p class="neutral-50 text-lg inter-sb q-mb-none">Ajak teman-temanmu berlibur ke wisata alam ramah lingkungan
          dengan Traveleen, yang memungkinkan kamu membayar
          tiket masuk dengan poin yang sudah ditukar dengan sampah.</p>
      </div>
      <div class="search-landing q-pa-auto">
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
      <div class="category-landing">
        <p class="inter-b text-5xl neutral-900 text-center q-mb-none q-mb-lg">Kategori Wisata</p>
        <div class="row justify-evenly">
          <q-card class="my-card">
            <q-icon name="img:/icons/LandingPage/pantai-landing.jpg" class="category-image" />
            <div class="text-subtitle2 absolute-top text-center inter-b text-3xl neutral-50 q-mt-xl">
              Pantai
            </div>
          </q-card>
          <q-card class="my-card">
            <q-icon name="img:/icons/LandingPage/airTerjun-landing.jpg" class="category-image" />
            <div class="text-subtitle2 absolute-top text-center inter-b text-3xl neutral-50 q-mt-xl">
              Air Terjun
            </div>
          </q-card>
          <q-card class="my-card">
            <q-icon name="img:/icons/LandingPage/gunung-landing.jpg" class="category-image" />
            <div class="text-subtitle2 absolute-top text-center inter-b text-3xl neutral-50 q-mt-xl">
              Gunung
            </div>
          </q-card>
        </div>
      </div>
      <div class="feature-landing">
        <p class="inter-b text-5xl neutral-900 q-mb-none q-mb-sm text-center">Fitur Unggulan</p>
        <p class="inter-sb text-base neutral-500 q-mb-none text-center">Nikmati berbagai keuntungan ketika menggunakan
          layanan kami.</p>
        <div class="row justify-evenly">
          <q-card class="feature-card text-center">
            <q-icon name="img:/icons/LandingPage/feature-1.svg" class="feature-image" />
            <p class="inter-b text-xl neutral-900 q-mb-none q-mt-lg">Cari Destinasi Impianmu</p>
            <p class="inter-r text-base neutral-900 q-mb-none">Temukan berbagai pilihan wisata alam yang sesuai dengan
              minatmu </p>
          </q-card>
          <q-card class="feature-card text-center">
            <q-icon name="img:/icons/LandingPage/feature-2.svg" class="feature-image" />
            <p class="inter-b text-xl neutral-900 q-mb-none q-mt-lg">Bayar Dengan Sampah</p>
            <p class="inter-r text-base neutral-900 q-mb-none">Tukar sampahmu dengan untuk membayar tiket wisata alam</p>
          </q-card>
          <q-card class="feature-card text-center">
            <q-icon name="img:/icons/LandingPage/feature-3.svg" class="feature-image" />
            <p class="inter-b text-xl neutral-900 q-mb-none q-mt-lg">Jaga, Pelajari, dan Berkontribusi</p>
            <p class="inter-r text-base neutral-900 q-mb-none">Tingkatkan kesadaranmu tentang pentingnya menjaga alam dengan edukasi yang tersedia</p>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LandingPage',

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
