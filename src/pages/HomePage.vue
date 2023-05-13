<template>
  <q-page>
    <div class="home-headline q-mt-xl">
      <div class="headline-tag q-ml-xl">
        <div class="gt-xs">
          <p class="neutral-50 text-5xl inter-b q-mb-none">Berlibur Hemat, Alam Semakin Cemerlang</p>
          <p class="neutral-50 text-lg inter-sb q-mb-none">Ajak teman-temanmu berlibur ke wisata alam ramah lingkungan
            dengan Traveleen, yang memungkinkan kamu membayar
            tiket masuk dengan poin yang sudah ditukar dengan sampah.</p>
        </div>
        <div class="lt-sm">
          <p class="neutral-50 text-4xl inter-b q-mb-none">Berlibur Hemat, Alam Semakin Cemerlang</p>
          <p class="neutral-50 text-lg inter-sb q-mb-none q-mt-md">Ajak teman-temanmu berlibur ke wisata alam ramah
            lingkungan
            dengan Traveleen, yang memungkinkan kamu membayar
            tiket masuk dengan poin yang sudah ditukar dengan sampah.</p>
        </div>
      </div>
      <div class="search-home q-pa-auto">
        <div class="row items-center justify-evenly">
          <div>
            <p class="inter-sb text-base neutral-500 q-mb-none">
              Lokasi
            </p>
            <q-select outlined v-model="chooseRegion" :options="regionOptions" clearable
            class="choose-region inter-r text-base emerald-60" dense />
          </div>
          <div>
            <p class="inter-sb text-base neutral-500 q-mb-none">
              Jenis Wisata
            </p>
            <q-select outlined v-model="chooseCategory" :options="categoryOptions" clearable
            class="choose-region inter-r text-base emerald-60" dense />
          </div>
          <q-btn unelevated label="Cari" class="find-button text-base inter-sb column" no-caps @click="toCatalog" />
        </div>
      </div>
    </div>
    <div class="main-container">
      <p class="inter-b text-4xl neutral-900 q-mb-none q-mt-xl q-pt-xl text-center gt-sm">#PeduliLingkungan</p>
      <router-link to="/education" class="lt-md">
        <p class="inter-b text-2xl neutral-900 q-mb-none q-mt-xl q-pt-xl text-center ">#PeduliLingkungan</p>
      </router-link>
      <div class="row justify-evenly items-center q-mt-xl">
        <q-card class="education-home col-sm-12 col-md-5 col-lg-5">
          <q-img src="/icons/education.jpg" />
          <p class="inter-b text-xl neutral-900 q-mb-none q-pa-md">Liburan Seru di Wisata Alam Tanpa Merusak Lingkungan:
            Tips dan Trik</p>
        </q-card>
        <q-card class="education-home col-sm-12 col-md-5 col-lg-5">
          <q-img src="/icons/education-2.jpg" />
          <p class="inter-b text-xl neutral-900 q-mb-none q-pa-md">Cara Memilah Sampah yang Benar: Membantu Mengurangi
            Beban Lingkungan</p>
        </q-card>
        <router-link to="/education" class="gt-md">
          <q-icon name="img:/icons/HomePage/education-arrow.svg" size="72px" />
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import { homeSubmitValue } from 'src/Store';
import { ref } from 'vue';

export default {
  name: 'HomePage',

  data() {
    return {
      location: ref(null),
      type: ref(null),
    };
  },

  setup() {
    return {
      chooseRegion: ref(null),
      chooseCategory: ref(null),
      regionOptions: [
        'Bali', 'Jawa Timur', 'Jawa Tengah', 'Jawa Barat'
      ],
      categoryOptions: [
        'Pantai', 'Air Terjun', 'Gunung',
      ],
    }
  },

  methods: {
    toCatalog() {
      homeSubmitValue(this.chooseRegion, this.chooseCategory)
      this.$router.push('/catalog');
    }
  }
}
</script>

<style>
.find-input {
  width: 260px;
}

.choose-region {
  min-width: 260px;
}
</style>
