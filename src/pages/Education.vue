<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="popular-education">
        <p class="inter-b text-3xl neutral-50 q-mb-none text-center">Poopuler di Traveleen</p>
        <div class="row justify-evenly">
          <q-card class="education-card">
            <q-img src="/icons/education.jpg" />
            <p class="inter-r text-lg neutral-900 q-mb-none q-pa-md">Liburan Seru di Wisata Alam Tanpa Merusak Lingkungan:
              Tips dan Trik</p>
          </q-card>
          <q-card class="education-card">
            <q-img src="/icons/education-2.jpg" />
            <p class="inter-r text-lg neutral-900 q-mb-none q-pa-md">Cara Memilah Sampah yang Benar: Membantu Mengurangi
              Beban Lingkungan</p>
          </q-card>
          <q-card class="education-card">
            <q-img src="/icons/education-3.jpg" />
            <p class="inter-r text-lg neutral-900 q-mb-none q-pa-md">7 Cara Mudah Menerapkan Prinsip 3R (Reduce, Reuse,
              Recycle) di Rumah</p>
          </q-card>
        </div>
      </div>
      <div class="q-mx-xl q-px-xl">
        <div class="column justify-center items-center q-mt-xl q-mb-xl">
          <q-input rounded outlined v-model="search" type="search" class="search-box" dense>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-table :rows="rows" :columns="columns" :filter="search" row-key="id" grid hide-header hide-pagination
          :rows-per-page-options="[9]">
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-7 col-md-5 col-lg-4 q-mb-xl">
              <q-card class="education-card">
                <q-img :src="props.row.thumbnail" />
                <p class="inter-r text-lg neutral-900 q-mb-none q-pa-md">{{ props.row.title }}</p>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

const columns = [
  {
    name: 'id',
    required: true,
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'thumbnail', field: 'thumbnail', sortable: false },
  { name: 'title', field: 'title', sortable: true },
]

const rows = [
  {
    id: 1,
    thumbnail: '/icons/education-4.jpg',
    title: 'Memahami Dampak Negatif Sampah Plastik Terhadap Lingkungan',
  },
  {
    id: 2,
    thumbnail: '/icons/education-5.jpg',
    title: '5 Wisata Alam Terbaik yang Dapat Mengajarkan Kita Tentang Pentingnya Konservasi Lingkungan',
  },
  {
    id: 3,
    thumbnail: '/icons/education-6.jpg',
    title: 'Mengajarkan Anak-Anak Cara Memilah Sampah dengan Metode yang Menyenangkan',
  },
  {
    id: 4,
    thumbnail: '/icons/education-7.jpg',
    title: '10 Ide Kreatif Mengubah Sampah Menjadi Barang yang Bernilai Tinggi',
  },
  {
    id: 5,
    thumbnail: '/icons/education-8.jpg',
    title: 'Ekowisata: Menjaga Kelestarian Alam dan Meningkatkan Kesejahteraan Ekonomi Masyarakat Lokal',
  },
  {
    id: 6,
    thumbnail: '/icons/education-9.jpg',
    title: 'Sampah Organik vs Non-Organik: Mana yang Harus Didaur Ulang dan Bagaimana Caranya?',
  },
  {
    id: 7,
    thumbnail: '/icons/education-10.jpg',
    title: 'Memahami Konsep Zero Waste dan Langkah-Langkah Mudah untuk Menerapkannya',
  },
  {
    id: 8,
    thumbnail: '/icons/education-11.jpg',
    title: 'Wisata Edukasi Lingkungan: Mengunjungi Tempat Pengolahan Sampah yang Ramah Lingkungan',
  },
  {
    id: 9,
    thumbnail: '/icons/education-12.jpg',
    title: 'Mengenal Jenis-Jenis Sampah Berbahaya dan Cara Mengolahnya dengan Aman',
  },
]

export default {
  name: 'Education',

  setup() {
    return {
      search: ref(null),
      rows,
      columns,
    }
  }
}
</script>
