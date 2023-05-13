<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="main-container ">
        <div class="row justify-center items-center">
          <q-select rounded outlined v-model="chooseRegion" :options="regionOptions" clearable
            class="col-4 inter-r text-base emerald-60 q-mr-lg" dense>
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
          <q-input rounded outlined v-model="search" type="search" class="col-7" dense>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div v-if="isLoading" class="detail-header q-mt-xl">
          <q-skeleton type="text" width="20%" class="text-subtitle1" animation="fade" />
          <q-skeleton type="text" width="40%" height="36px" animation="fade" />
          <q-skeleton type="text" width="30%" class="text-subtitle1" animation="fade" />
          <div class="row justify-between items-center q-mt-md">
            <q-skeleton width="60%" height="400px" square animation="fade" />
            <div class="column col-4">
              <q-skeleton width="100%" height="200px" square animation="fade" class="col-7 q-mb-md" />
              <q-skeleton width="100%" height="200px" square animation="fade" class="col-7" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="detail-header q-mt-xl">
            <p class="inter-r text-xl emerald-600 q-mb-none">{{ category }}</p>
            <p class="inter-b text-4xl neutral-900 q-mb-none">{{ name }}</p>
            <div class="row q-mt-sm q-mb-sm items-center">
              <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
              <p class="inter-r text-lg neutral-500 q-mb-none q-ml-sm">{{ region }}</p>
            </div>
            <div class="row justify-between items-center">
              <q-img :src="thumbnail[0]" class="left-image col-7" />
              <div class="column col-4">
                <q-img :src="thumbnail[1]" class="right-image q-mb-md" />
                <q-img :src="thumbnail[2]" class="right-image " />
              </div>
            </div>
          </div>
          <div class="row justify-between q-mt-xl">
            <div class="col-md-12 col-lg-7">
              <div class="detail-rating row justify-between">
                <div class="col-5">
                  <p class="inter-b text-2xl neutral-900 q-mb-none">Dari {{ totalRatings }} Pengguna</p>
                  <div class="col-lg-3">
                    <div class="row items-center q-mt-lg">
                      <div class="rating-bg column justify-center text-center">
                        <p class="inter-b text-3xl q-mb-none">{{ rating }}</p>
                      </div>
                      <p class="inter-b text-3xl emerald-600 q-mb-none q-ml-md">Luar Biasa</p>
                    </div>
                    <div class="row q-mt-lg" v-if="topThumbnail">
                      <q-img :src='topThumbnail[0]' class="col-3" />
                      <q-img :src='topThumbnail[1]' class="q-mx-md col-3" />
                      <q-img :src='topThumbnail[2]' class="col-3" />
                    </div>
                  </div>
                </div>
                <div class="rating-comment column justify-between gt-xs col-6">
                  <div>
                    <p class="inter-b text-2xl neutral-900 q-mb-none">Apa Yang Dikatakan Pengguna</p>
                    <p class="inter-r text-base neutral-900 q-mb-none q-mt-sm text-justify">{{ topBody }}</p>
                  </div>
                  <div>
                    <div class="row q-mt-md">
                      <p class="inter-r text-base neutral-900 q-mb-none">{{ topUsername }} - </p>
                      <p class="inter-r text-base neutral-700 q-mb-none q-ml-xs">{{ topDate }}</p>
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
              <div class="detail-location col-12">
                <iframe :src="map" frameborder="0" class="detail-map" allowfullscreen></iframe>
              </div>
            </div>
            <div class="col-md-12 col-lg-4 buy-detail">
              <p class="inter-b text-2xl emerald-600 q-mb-none">Rp {{ formatNumber(price) }}</p>
              <q-btn unelevated color="primary" label="Beli" no-caps class="buy-button q-mt-md" @click="addtoCart()" />
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
                  <div class="col-10 column q-ml-md">
                    <p class="inter-sb text-base neutral-900 q-mb-none">{{ props.row.username }}</p>
                    <p class="inter-r text-sm neutral-700 q-mb-none">{{ props.row.date }}</p>
                    <P class="inter-r text-base neutral-900 q-mb-none q-mt-sm text-justify">{{ props.row.body }}</P>
                    <div class="row q-mt-sm" v-if="props.row.thumbnail">
                      <q-img :src='props.row.thumbnail[0]' class="comment-image" />
                      <q-img :src='props.row.thumbnail[1]' class="comment-image q-mx-md" />
                      <q-img :src='props.row.thumbnail[2]' class="comment-image" />
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
import { api } from 'src/boot/axios';
import { getToken } from 'src/utils/localstorage';
import { ref } from 'vue';
import { Notify, useQuasar } from 'quasar';
import { onBeforeUnmount } from 'vue'

export default {
  name: 'Detail',

  data() {
    return {
      id: this.$route.params.id,
      fetchUrl: 'api/v1/tourism/',
      cartUrl: 'api/v1/tourism/add/',
      region: ref(''),
      category: ref(''),
      thumbnail: ref([]),
      name: ref(''),
      rating: ref(0),
      totalRatings: ref(0),
      price: ref(0),
      description: ref(''),
      map: ref(''),
      jamOperasional: ref([]),
      topBody: ref(''),
      topUsername: ref(''),
      topDate: ref(''),
      topThumbnail: ref([]),
      isLoading: ref(true)
    }
  },

  setup() {
    const columns = [
      {
        name: 'id',
        required: true,
        field: row => row.id,
        format: val => `${val}`,
        sortable: false
      },
      { name: 'username', field: 'username', sortable: false },
      { name: 'date', field: 'date', sortable: false },
      { name: 'rating', field: 'rating', sortable: false },
      { name: 'body', field: 'body', sortable: false },
      { name: 'thumbnail', field: 'thumbnail', sortable: false },
    ]

    const rows = ref([])

    const $q = useQuasar()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    return {
      search: ref(null),
      chooseRegion: ref(null),
      regionOptions: [
        'Bali', 'Jawa Timur', 'Jawa Tengah', 'Jawa Barat'
      ],
      columns,
      rows,
      showLoading() {
        $q.loading.show({
          message: 'Memasukkan kedalam keranjang...'
        })

        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 10000)
      }
    }
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

    async addtoCart() {
      this.showLoading()
      try {
        const token = getToken()
        console.log(token);
        const argQuantity = 1;
        const url = this.cartUrl + this.id + '/cart';
        const response = await api.post(url, {
          quantity: argQuantity
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.data.data) this.$router.push('/checkout');
      } catch (error) {
        console.log(error);
        this.$q.loading.hide()
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan kedalam keranjang silahkan coba kembali',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  async mounted() {
    try {
      const token = getToken()
      const url = this.fetchUrl + this.id;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data.data);
      const ecotourismData = response.data.data
      if (response.data.status) {
        this.category = ecotourismData.category;
        this.name = ecotourismData.name;
        this.description = ecotourismData.description;
        this.thumbnail = ecotourismData.thumbnail;
        this.region = ecotourismData.region;
        this.jamOperasional = ecotourismData.operational_time;
        this.price = ecotourismData.price;
        this.rating = ecotourismData.rating;
        this.totalRatings = ecotourismData.total_ratings;
        this.map = ecotourismData.maps;
        this.rows = ecotourismData.comments.map(item => ({
          id: item.id,
          date: item.date,
          username: item.user.username,
          rating: item.rating,
          body: item.body,
          thumbnail: item.thumbnail
        }));
        this.topBody = ecotourismData.comments[0].body
        this.topUsername = ecotourismData.comments[0].user.username
        this.topDate = ecotourismData.comments[0].date
        this.topThumbnail = ecotourismData.comments[0].thumbnail
      }
      this.isLoading = false;
    }
    catch (error) {
      console.log(error);
      Notify.create({
        color: 'red',
        message: 'Gagal mengambil data silahkan refresh halaman',
        position: 'top',
        timeout: 2500
      });
    }
  }
}
</script>

<style>
.buy-button {
  width: 100%;
  height: 48px;
}
</style>
