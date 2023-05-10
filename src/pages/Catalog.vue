<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="main-container">
        <div class="row justify-center items-center gt-md">
          <q-select rounded outlined v-model="chooseRegion" :options="regionOptions" clearable
            class="select-box inter-r text-base emerald-60 q-mr-lg col-3" dense>
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
          <q-input rounded outlined v-model="search" type="search" class="search-box col-8" dense>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="lt-lg">
          <div v-if="chooseRegion" class="row justify-between items-center">
            <p class="inter-b text-xl neutral-900 q-mb-none gt-xs">
              Menampilkan Tempat wisata di {{ chooseRegion }}
            </p>
            <q-btn flat label="Filter" class="inter-b neutral-900 text-lg" icon-right="sort" no-caps
              @click="slide = !slide" />
          </div>
          <div v-else class="row justify-between items-center">
            <p class="inter-b text-xl neutral-900 q-mb-none gt-xs">
              Menampilkan Semua Tempat wisata
            </p>
            <q-btn flat label="Filter" class="inter-b neutral-900 text-lg" icon-right="sort" no-caps @click="slide = !slide
              " />
          </div>
          <q-slide-transition>
            <div v-show="slide" class="catalog-filter">
              <q-input rounded outlined v-model="search" type="search" class="q-mb-lg" dense>
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <p class="inter-sb text-base neutral-900 q-mb-none q-mb-sm q-mt-lg">Lokasi</p>
              <q-select outlined v-model="chooseRegion" :options="regionOptions" clearable
                class="inter-r text-base emerald-600" dense>
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
              <p class="inter-sb text-base neutral-900 q-mb-none q-mb-sm q-mt-md">Urutkan dari</p>
              <q-select outlined v-model="sortBy" :options="sortOptions" clearable
                class="inter-r text-base emerald-600 col-12" dense>
                <template v-slot:selected>
                  <template v-if="sortBy">
                    {{ sortBy }}
                  </template>
                  <template v-else>Semua</template>
                </template>
              </q-select>
              <p class="inter-sb text-base neutral-900 q-mb-none q-mb-sm q-mt-md">Kategori</p>
              <q-option-group v-model="chooseCategory" :options="options" color="green" inline />
              <q-btn unelevated label="Selesai" class="filter-button text-base inter-sb q-mt-xl" color="primary" no-caps
                @click="slide = !slide" />
            </div>
          </q-slide-transition>
        </div>
        <div class="row justify-between q-mt-xl">
          <div class="col-2 gt-md">
            <div class="category-option">
              <p class="inter-b text-xl neutral-900 q-mb-none q-mb-md text-center">Kategori</p>
              <div class="inter-r text-base neutral-900">
                <q-option-group v-model="chooseCategory" :options="options" color="green" />
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-9">
            <div v-if="chooseRegion" class="row justify-between items-center q-mb-lg gt-md">
              <p class="inter-b text-3xl neutral-900 q-mb-none">
                Menampilkan Tempat wisata di {{ chooseRegion }}
              </p>
              <q-select rounded outlined v-model="sortBy" :options="sortOptions" clearable
                class="select-box inter-r text-base emerald-60 q-mr-lg" dense>
                <template v-slot:selected>
                  <template v-if="sortBy">
                    {{ sortBy }}
                  </template>
                  <template v-else>Semua</template>
                </template>
              </q-select>
            </div>
            <div v-else class="row justify-between items-end q-mb-lg gt-md">
              <p class="inter-b text-3xl neutral-900 q-mb-none">
                Menampilkan Semua Tempat wisata
              </p>
              <q-select rounded outlined v-model="sortBy" :options="sortOptions" clearable
                class="select-box inter-r text-base emerald-60 q-mr-lg" dense>
                <template v-slot:selected>
                  <template v-if="sortBy">
                    {{ sortBy }}
                  </template>
                  <template v-else>Semua</template>
                </template>
              </q-select>
            </div>
            <q-parallax :height="200" :speed="1.5" class="gt-sm">
              <template v-slot:media>
                <img src="/icons/Catalog/header-image.jpg">
              </template>
              <p class="inter-b text-3xl neutral-50 q-mb-none q-pa-xl">Jangan biarkan lingkungan kita tercemar oleh
                sampah, yuk peduli dalam mengurangi sampah</p>
            </q-parallax>
            <q-table :rows="filteredRows" :columns="columns" :filter="chooseCategory" row-key="id" grid hide-header
              hide-pagination v-model:pagination="pagination">
              <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-4 column items-center">
                  <q-item clickable :to="`/detail-${props.row.id}`" replace>
                    <q-card class="catalog-card">
                      <q-img :src=props.row.thumbnail class="catalog-thumbnail" />
                      <div class="row q-mt-md items-center">
                        <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
                        <p class="inter-r text-base neutral-500 q-mb-none q-ml-sm">{{ props.row.region }}</p>
                      </div>
                      <p class="inter-r text-lg emerald-600 q-mb-none q-mt-sm">{{ props.row.category }}</p>
                      <p class="inter-b text-2xl neutral-900 q-mb-none">{{ props.row.name }}</p>
                      <div class="row justify-between items-center q-mt-lg">
                        <div class="row">
                          <q-icon name="img:/icons/Catalog/star.svg" size="26px" />
                          <div class="row items-end">
                            <p class="inter-b text-base emerald-600 q-mb-none">{{ props.row.rating }}</p>
                            <p class="inter-r text-base neutral-500 q-mb-none">{{ props.row.totalRatings }}</p>
                          </div>
                        </div>
                        <P class="inter-sb text-xl neutral-900 q-mb-none">RP {{ formatNumber(props.row.price) }}</P>
                      </div>
                    </q-card>
                  </q-item>
                </div>
              </template>
            </q-table>
            <div class="row justify-center q-mt-md">
              <q-pagination v-model="pagination" color="teal" :max="pagesNumber" :max-pages="5" :ellipses="false"
                :boundary-numbers="false" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { homeLocation, homeType } from 'src/Store';
import { getToken } from 'src/utils/localstorage';

export default {
  name: 'Catalog',

  setup() {
    const columns = [
      {
        name: 'id',
        required: true,
        field: row => row.id,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'region', field: 'region', sortable: true },
      { name: 'category', field: 'category', sortable: true },
      { name: 'thumbnail', field: 'thumbnail', sortable: true },
      { name: 'name', field: 'name', sortable: true },
      { name: 'rating', field: 'rating', sortable: false },
      { name: 'totalRatings', field: 'totalRatings', sortable: false },
      { name: 'price', field: 'price', sortable: false },
    ]

    const rows = ref([])

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 2,
      rowsPerPage: 3,
      rowsNumber: 20
    })

    return {
      search: ref(''),
      model: ref(null),
      chooseRegion: ref(null),
      sortBy: ref(null),
      chooseCategory: ref(null),
      slide: ref(false),
      columns,
      rows,
      pagination,
      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage)),
      regionOptions: [
        'Bali', 'Jawa Timur', 'Jawa Tengah', 'Jawa Barat'
      ],
      sortOptions: [
        'Paling Populer', 'Harga Tertinggi', 'Harga Terendah',
      ],
      options: [
        {
          label: 'Semua',
          value: null,
        },
        {
          label: 'Pantai',
          value: 'Pantai',
        },
        {
          label: 'Air Terjun',
          value: 'Air Terjun',
        },
        {
          label: 'Gunung',
          value: 'Gunung',
        },
      ],
    }
  },

  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) {
        return '0'
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(',', '.');
    },
  },

  computed: {
    filteredRows() {
      const filtered = this.rows.filter(row => {
        let validSearch = true;
        let validRegion = true;
        let validCategory = true;

        if (this.search) {
          validSearch = row.name.toLowerCase().includes(this.search.toLowerCase());
        }

        if (this.chooseRegion && this.chooseRegion !== "Semua") {
          validRegion = row.region === this.chooseRegion;
        }

        if (this.chooseCategory && this.chooseCategory !== "Semua") {
          validCategory = row.category === this.chooseCategory;
        }

        return validSearch && validRegion && validCategory;
      });

      if (this.sortBy === "Paling Populer") {
        return filtered.sort((a, b) => b.rating - a.rating);
      } else if (this.sortBy === "Harga Tertinggi") {
        return filtered.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === "Harga Terendah") {
        return filtered.sort((a, b) => a.price - b.price);
      } else {
        return filtered;
      }
    }
  },

  mounted() {
    if (homeType.value != null && homeLocation.value != null) {
      this.chooseCategory = homeType.value;
      this.chooseRegion = homeLocation.value;
    } else if (homeType.value != null) {
      this.chooseCategory = homeType.value;
    } else if (homeLocation.value != null) {
      this.chooseRegion = null;
    }
  },

  async mounted() {
    try {
      const token = getToken()
      console.log(token);
      const response = await api.get('api/v1/tourism/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      if (response.data.status) {
        const data = response.data.data;
        this.rows = data.map(item => ({
          id: item.id,
          thumbnail: item.thumbnail[0],
          region: item.region,
          category: item.category,
          name: item.name,
          rating: item.rating,
          price: item.price
        }));
      }
    }
    catch (error) {
      console.log(error);
    }
  },
}
</script>

<style>
.filter-button {
  width: 100%;
}
</style>
