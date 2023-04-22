<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="q-mx-xl q-px-xl q-mt-xl">
        <div class="row justify-center items-center">
          <q-select rounded outlined v-model="chooseRegion" :options="regionOptions" clearable
            class="select-box inter-r text-base emerald-60 q-mr-lg" dense>
            <template v-slot:prepend>
              <q-icon name="img:/icons/Catalog/select.svg" />
            </template>
            <template v-slot:selected>
              <template v-if="chooseRegion">
                {{ chooseRegion }}
              </template>
              <template v-else>Semua</template>
            </template>
          </q-select>
          <q-input rounded outlined v-model="search" type="search" class="search-box" dense>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <p class="inter-r text-xs neutral-900 q-mb-none">{{ $route.params.id }}</p>
        <div class="detail-header">
          <p class="inter-r text-2xl emeral-600 q-mb-none">{{ category }}</p>
          <p class="inter-b text-4xl neutral-900 q-mb-none">{{ name }}</p>
          <div class="row q-mt-sm q-mb-sm items-center">
            <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
            <p class="inter-r text-lg neutral-500 q-mb-none q-ml-sm">{{ region }}</p>
          </div>
          <div class="row justify-between items-center">
            <q-icon :name="thumbnail[0]" class="thumbnail-left" />
            <div class="column">
              <q-icon :name="thumbnail[1]" class="thumbnail-right q-mb-md" />
              <q-icon :name="thumbnail[2]" class="thumbnail-right" />
            </div>
          </div>
        </div>
        <div class="row q-mt-xl">
          <div class="col-8">
            <div class="detail-rating row justify-between">
              <div>
                <p class="inter-b text-2xl neutral-900 q-mb-none">Dari {{ totalRatings }} Pengguna</p>
                <div class="col-3">
                  <div class="row items-center q-mt-lg">
                    <div class="rating-bg column justify-center text-center">
                      <p class="inter-b text-3xl q-mb-none">{{ rating }}</p>
                    </div>
                    <p class="inter-b text-3xl emerald-600 q-mb-none q-ml-md">Luar Biasa</p>
                  </div>
                  <div class="row q-mt-lg">
                    <q-icon :name='rows[1].thumbnail[0]' size="72px" />
                    <q-icon :name='rows[1].thumbnail[1]' size="72px" class="q-mx-md" />
                    <q-icon :name='rows[1].thumbnail[0]' size="72px" />
                  </div>
                </div>
              </div>
              <div class="rating-comment column justify-between">
                <div>
                  <p class="inter-b text-2xl neutral-900 q-mb-none">Apa Yang Dikatakan Pengguna</p>
                  <p class="inter-r text-base neutral-900 q-mb-none q-mt-sm">{{ rows[0].comment }}</p>
                </div>
                <div>
                  <div class="row">
                    <p class="inter-r text-base neutral-900 q-mb-none">{{ rows[0].name }} - </p>
                    <p class="inter-r text-base neutral-700 q-mb-none q-ml-xs">{{ rows[0].date }}</p>
                  </div>
                  <p class="inter-r text-base emerald-600 q-mb-none q-mt-sm column items-end cursor-pointer"
                    @click="scrollToComments">Lihat Semua</p>
                </div>
              </div>
            </div>
            <p class="inter-b text-3xl neutral-900 q-mb-none q-mt-xl q-mb-md">Detail Wisata</p>
            <div class="detail-description">
              <p class="inter-r text-base neutral-900 q-mb-none text-justify">{{ description }}</p>
            </div>
            <p class="inter-b text-3xl neutral-900 q-mb-none q-mt-xl q-mb-md">Detail Lokasi</p>
            <div class="detail-location">
              <q-img src="/icons/Detail/location.jpg" />
            </div>
          </div>
          <div class="col-4 buy-detail">
            <p class="inter-b text-2xl emerald-600 q-mb-none">Rp {{ formatNumber(price) }}</p>
            <q-btn unelevated color="primary" label="Beli" no-caps class="buy-button q-mt-md"
              @click="addToCart(id, name, price)" to="/checkout" />
            <p class="inter-sb text-lg neutral-900 q-mb-none q-my-sm">jam Buka (Waktu Lokal)</p>
            <div class="row justify-between">
              <p class="inter-r text-base neutral-900 q-mb-none">Senin</p>
              <p class="inter-b text-base neutral-900 q-mb-none">{{ jamOperasional[0] }}</p>
            </div>
            <div class="row justify-between q-my-xs">
              <p class="inter-r text-base neutral-900 q-mb-none">Selasa</p>
              <p class="inter-b text-base neutral-900 q-mb-none">{{ jamOperasional[1] }}</p>
            </div>
            <div class="row justify-between">
              <p class="inter-r text-base neutral-900 q-mb-none">Rabu</p>
              <p class="inter-b text-base neutral-900 q-mb-none">{{ jamOperasional[2] }}</p>
            </div>
            <div class="row justify-between q-my-xs">
              <p class="inter-r text-base neutral-900 q-mb-none">Kamis</p>
              <p class="inter-b text-base neutral-900 q-mb-none">{{ jamOperasional[3] }}</p>
            </div>
            <div class="row justify-between">
              <p class="inter-r text-base neutral-900 q-mb-none">Jumat</p>
              <p class="inter-b text-base neutral-900 q-mb-none">{{ jamOperasional[4] }}</p>
            </div>
            <div class="row justify-between q-my-xs">
              <p class="inter-r text-base neutral-900 q-mb-none">Sabtu</p>
              <p class="inter-b text-base neutral-900 q-mb-none">{{ jamOperasional[5] }}</p>
            </div>
            <div class="row justify-between">
              <p class="inter-r text-base neutral-900 q-mb-none">Minggu</p>
              <p class="inter-b text-base neutral-900 q-mb-none">{{ jamOperasional[6] }}</p>
            </div>
          </div>
          <div class="detail-comments q-mt-xl" id="comments-section">
            <p class="inter-b text-3xl neutral-900 q-mb-none">{{ totalRatings }} Pengguna <span
                class="inter-b text-3xl emerald-600 q-mb-none">Traveleen</span> telah membagikan pengalaman di
              wisata ini:</p>
            <q-table :rows="rows" :columns="columns" row-key="id" grid hide-header hide-pagination
              :rows-per-page-options="[10]">
              <template v-slot:item="props">
                <div class="comment-container row items-center q-my-sm">
                  <div class="personal-rating-bg column justify-center text-center">
                    <p class="inter-b text-xl q-mb-none">{{ props.row.rating }}</p>
                  </div>
                  <div class="col-11 column q-ml-md">
                    <p class="inter-sb text-base neutral-900 q-mb-none">{{ props.row.name }}</p>
                    <p class="inter-r text-sm neutral-700 q-mb-none">{{ props.row.date }}</p>
                    <P class="inter-r text-base neutral-900 q-mb-none q-mt-sm">{{ props.row.comment }}</P>
                    <div class="row q-mt-sm" v-if="props.row.thumbnail[0]">
                      <q-icon :name='props.row.thumbnail[0]' size="72px" />
                      <q-icon :name='props.row.thumbnail[1]' size="72px" class="q-mx-md" />
                      <q-icon :name='props.row.thumbnail[2]' size="72px" />
                    </div>
                  </div>
                  <div class="divider q-my-md" v-if="props.row.id < rows.length" />
                </div>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions } from 'vuex';

const columns = [
  {
    name: 'id',
    required: true,
    field: row => row.id,
    format: val => `${val}`,
    sortable: false
  },
  { name: 'name', field: 'name', sortable: false },
  { name: 'date', field: 'date', sortable: false },
  { name: 'rating', field: 'rating', sortable: false },
  { name: 'comment', field: 'comment', sortable: false },
  { name: 'thumbnail', field: 'thumbnail', sortable: false },
]

const rows = [
  {
    id: 1,
    name: 'John Martson',
    date: 'Senin, 5 April 2023',
    comment: 'Pantai Nusa Dua adalah pantai yang sangat indah. Airnya bersih dan pasirnya putih seperti gula. Saya sangat menikmati waktu saya di sini.',
    rating: 9,
    thumbnail: [],
  },
  {
    id: 2,
    name: 'Dutch Van Der Linde',
    date: 'Senin, 5 April 2023',
    comment: 'Pantai Nusa Dua adalah pantai yang lumayan bagus. Tidak terlalu ramai, tapi juga tidak terlalu sepi. Pantainya bersih dan bagus untuk berjemur.',
    rating: 7,
    thumbnail: ['img:/icons/Detail/comments-image.jpg', 'img:/icons/Detail/comments-image-2.jpg'],
  },
  {
    id: 3,
    name: 'Mary Beth',
    date: 'Kamis, 1 Januari 2023',
    comment: 'Pantai Nusa Dua adalah tempat yang sangat bagus untuk bersantai. Saya suka suasananya yang tenang dan airnya yang jernih. Sayangnya, pantainya agak terlalu berbatu untuk berenang.',
    rating: 8,
    thumbnail: [],
  },
  {
    id: 4,
    name: 'Jason Todd',
    date: 'Rabu, 29 Desember 2022',
    comment: 'Pantai Nusa Dua adalah pantai terbaik yang pernah saya kunjungi. Pemandangannya sangat indah dan pantainya bersih sekali. Saya pasti akan kembali ke sini suatu saat nanti.',
    rating: 10,
    thumbnail: [],
  },
  {
    id: 5,
    name: 'Kal Cestis',
    date: 'Kamis, 28 oktober 2022',
    comment: 'Pantai Nusa Dua adalah pantai yang sangat bagus. Airnya bersih dan pantainya sangat indah. Ada banyak kegiatan air yang bisa dinikmati di sini dan saya pasti akan kembali ke sini suatu saat nanti.',
    rating: 9,
    thumbnail: ['img:/icons/Detail/comments-image-3.jpg', 'img:/icons/Detail/comments-image-4.jpg', 'img:/icons/Detail/comments-image-5.jpg'],
  },
]

export default {
  name: 'Detail',

  data() {
    return {
      id: this.$route.params.id,
      region: 'Bali',
      category: 'Pantai',
      thumbnail: ['img:/icons/beach.jpg', 'img:/icons/beach-2.jpg', 'img:/icons/beach-3.jpg'],
      name: 'Nusa Dua',
      rating: 8.7,
      totalRatings: 375,
      price: 10000,
      description: 'Nusa Dua adalah sebuah pantai yang terletak di Bali, Indonesia. Pantai ini terkenal sebagai salah satu pantai yang sangat eksklusif dan mewah di Bali. Nusa Dua memiliki pasir putih yang halus dan air laut yang jernih dan tenang, sehingga pantai ini sangat cocok untuk berenang atau hanya sekedar bersantai di tepi pantai. Selain itu, pantai ini juga dikelilingi oleh hotel-hotel bintang lima dan tempat-tempat wisata yang menarik. Di Nusa Dua, Anda dapat menikmati berbagai aktivitas seperti jet ski, snorkeling, atau bahkan menyelam untuk melihat keindahan terumbu karang yang berwarna-warni. Pantai ini juga memiliki pemandangan matahari terbenam yang sangat indah, sehingga sangat disarankan untuk menikmati keindahan ini bersama pasangan atau keluarga. Selain itu, Nusa Dua juga memiliki banyak restoran dan kafe yang menyajikan makanan dan minuman yang lezat dengan pemandangan pantai yang indah. Anda juga dapat membeli oleh-oleh khas Bali di toko-toko yang terdapat di sekitar pantai ini. Secara keseluruhan, Nusa Dua adalah tempat yang sangat cocok untuk menikmati liburan yang tenang dan santai di Bali. Dengan pasir putih yang lembut, air laut yang tenang, dan banyaknya aktivitas yang dapat dilakukan, Nusa Dua akan menjadi tempat yang tak terlupakan bagi siapa saja yang mengunjunginya.',
      jamOperasional: ['09.30 - 16.00', '09.30 - 16.00', '09.30 - 16.00', '09.30 - 16.00', '09.30 - 16.00', '08.30 - 18.00', '08.30 - 18.00']

    }
  },

  setup() {
    return {
      search: ref(null),
      chooseRegion: ref(null),
      regionOptions: [
        'Bali', 'Jawa Timur', 'Jawa Tengah', 'Jawa Barat'
      ],
      columns,
      rows,
    }
  },

  computed: {
    ...mapState('cart', ['items']),
  },

  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) {
        return '0'
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(',', '.');
    },

    scrollToComments() {
      const commentsSection = document.getElementById("comments-section");
      commentsSection.scrollIntoView({ behavior: "smooth" });
    },

    ...mapActions('cart', ['addToCart']),

    addToCart(id, name, price) {
      const item = {
        id,
        name,
        price,
        quantity: 1,
      };
      this.addToCart(item);
    },
  },
}
</script>

<style>
.buy-button {
  width: 100%;
  height: 48px;
}
</style>

{
  "id": 2,
  ..... data yang lainnya,
  "comments": [
  {
    "id": 7,
    "name":
    "date":
    "comments":,
    "image": ["https://reqres.in/img/faces/7-image.jpg", "https://reqres.in/img/faces/7-image.jpg",] (bisa kosong maks 3 gambar)
},
{
  "id": 7,
  "name":
  "date":
  "comments":,
  "image": ["https://reqres.in/img/faces/7-image.jpg", "https://reqres.in/img/faces/7-image.jpg",] (bisa kosong maks 3 gambar)
},
{
  "id": 7,
  "name":
  "date":
  "comments":,
  "image": ["https://reqres.in/img/faces/7-image.jpg", "https://reqres.in/img/faces/7-image.jpg",] (bisa kosong maks 3 gambar)
},
  ]
}
