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
        <div class="row  q-mt-xl">
          <div class="col-3">
            <div class="category-option">
              <p class="inter-b text-xl neutral-900 q-mb-none q-mb-md text-center">Kategori</p>
              <div class="inter-r text-base neutral-900">
                <q-option-group v-model="chooseCategory" :options="options" color="green" />
              </div>
            </div>
          </div>
          <div class="col-9">
            <div v-if="chooseRegion" class="row justify-between items-center q-mb-lg">
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
            <div v-else class="column items-end q-mb-lg">
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
            <q-parallax :height="200" :speed="1.5">
              <template v-slot:media>
                <img src="/icons/Catalog/header-image.jpg">
              </template>
              <p class="inter-b text-3xl neutral-50 q-mb-none q-pa-xl">Jangan biarkan lingkungan kita tercemar oleh
                sampah, yuk peduli dalam mengurangi sampah</p>
            </q-parallax>
            <q-table :rows="filteredRows" :columns="columns" :filter="chooseCategory" row-key="id" grid hide-header
              hide-pagination :rows-per-page-options="[10]">
              <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-7 col-md-5 col-lg-4 column items-center">
                  <q-item clickable :to="`/${props.row.id}`" replace>
                    <q-card class="catalog-card">
                      <q-icon :name=props.row.thumbnail class="catalog-thumbnail" />
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
                            <p class="inter-r text-base neutral-500 q-mb-none">({{ props.row.totalRatings }})</p>
                          </div>
                        </div>
                        <P class="inter-sb text-xl neutral-900 q-mb-none">RP {{ formatNumber(props.row.price) }}</P>
                      </div>
                    </q-card>
                  </q-item>
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
  { name: 'name', field: 'name', sortable: true },
  { name: 'rating', field: 'rating', sortable: false },
  { name: 'totalRatings', field: 'totalRatings', sortable: false },
  { name: 'price', field: 'price', sortable: false },
]

const rows = [
  {
    id: 1,
    region: 'Bali',
    category: 'Pantai',
    thumbnail: 'img:/icons/beach.jpg',
    name: 'Nusa Dua',
    rating: 8.7,
    totalRatings: 375,
    price: 90000
  },
  {
    id: 2,
    region: 'Jawa Barat',
    category: 'Air Terjun',
    thumbnail: 'img:/icons/Catalog/waterfall.jpg',
    name: 'Curug Ciherang',
    rating: 9.1,
    totalRatings: 480,
    price: 75000
  },
  {
    id: 3,
    region: 'Jawa Timur',
    category: 'Gunung',
    thumbnail: 'img:/icons/Catalog/mountain.jpg',
    name: 'Gunung Semeru',
    rating: 9.5,
    totalRatings: 950,
    price: 125000
  },
  {
    id: 4,
    region: 'Jawa Tengah',
    category: 'Air Terjun',
    thumbnail: 'img:/icons/Catalog/waterfall.jpg',
    name: 'Curug Lawe',
    rating: 8.9,
    totalRatings: 625,
    price: 65000
  },
  {
    id: 5,
    region: 'Bali',
    category: 'Pantai',
    thumbnail: 'img:/icons/beach.jpg',
    name: 'Kuta Beach',
    rating: 8.3,
    totalRatings: 425,
    price: 95000
  },
  {
    id: 6,
    region: 'Jawa Timur',
    category: 'Gunung',
    thumbnail: 'img:/icons/Catalog/mountain.jpg',
    name: 'Gunung Bromo',
    rating: 8.6,
    totalRatings: 870,
    price: 115000
  },
  {
    id: 7,
    region: 'Jawa Tengah',
    category: 'Air Terjun',
    thumbnail: 'img:/icons/Catalog/waterfall.jpg',
    name: 'Curug Cikaso',
    rating: 9.2,
    totalRatings: 510,
    price: 80000
  },
  {
    id: 8,
    region: 'Bali',
    category: 'Pantai',
    thumbnail: 'img:/icons/beach.jpg',
    name: 'Sanur Beach',
    rating: 8.1,
    totalRatings: 310,
    price: 85000
  },
  {
    id: 9,
    region: 'Jawa Timur',
    category: 'Gunung',
    thumbnail: 'img:/icons/Catalog/mountain.jpg',
    name: 'Gunung Ijen',
    rating: 9.4,
    totalRatings: 920,
    price: 135000
  },
  {
    id: 10,
    region: 'Jawa Barat',
    category: 'Air Terjun',
    thumbnail: 'img:/icons/Catalog/waterfall.jpg',
    name: 'Curug Cimahi',
    rating: 8.8,
    totalRatings: 560,
    price: 70000
  }
]

export default {
  name: 'Catalog',

  setup() {
    return {
      search: ref(''),
      model: ref(null),
      chooseRegion: ref(null),
      sortBy: ref(null),
      chooseCategory: ref(null),
      columns,
      rows,
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
}
</script>

<style>
</style>
