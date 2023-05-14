<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="popular-education">
        <p class="inter-b text-3xl neutral-50 text-center">Populer di Traveleen</p>
        <div v-if="isLoading" class="row justify-evenly">
          <q-card flat bordered class="education-card col-3">
            <q-skeleton height="200px" square animation="fade" />
            <q-card-section>
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
            </q-card-section>
          </q-card>
          <q-card flat bordered class="education-card col-3">
            <q-skeleton height="200px" square animation="fade" />
            <q-card-section>
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
            </q-card-section>
          </q-card>
          <q-card flat bordered class="education-card col-3">
            <q-skeleton height="200px" square animation="fade" />
            <q-card-section>
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
            </q-card-section>
          </q-card>
        </div>
        <q-table v-else :rows="rows" :columns="columns" :filter="search" row-key="id" grid hide-header hide-pagination
          :rows-per-page-options="[3]">
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-7 col-md-5 col-lg-4 q-mb-xl">
              <q-card class="education-card">
                <q-img :src="props.row.thumbnail" class="article-thumbnail" />
                <p class="inter-r text-lg neutral-900 q-mb-none q-pa-md">{{ props.row.title }}</p>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
      <div class="main-container">
        <div class="column justify-center items-center q-mt-xl q-mb-xl">
          <q-input rounded outlined v-model="search" type="search" class="search-education" dense>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div v-if="isLoading" class="row justify-evenly">
          <q-card flat bordered class="education-card col-3">
            <q-skeleton height="200px" square animation="fade" />
            <q-card-section>
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
            </q-card-section>
          </q-card>
          <q-card flat bordered class="education-card col-3">
            <q-skeleton height="200px" square animation="fade" />
            <q-card-section>
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
            </q-card-section>
          </q-card>
          <q-card flat bordered class="education-card col-3">
            <q-skeleton height="200px" square animation="fade" />
            <q-card-section>
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
              <q-skeleton type="text" width="100%" height="24px" animation="fade" />
            </q-card-section>
          </q-card>
        </div>
        <q-table v-else :rows="rows" :columns="columns" :filter="search" row-key="id" grid hide-header hide-pagination
          :rows-per-page-options="[9]">
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-7 col-md-5 col-lg-4 q-mb-xl">
              <q-card class="education-card">
                <q-img :src="props.row.thumbnail" class="article-thumbnail" />
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
import { getToken } from 'src/utils/localstorage';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'Education',

  data() {
    return {
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
      { name: 'date', field: 'date', sortable: false },
      { name: 'thumbnail', required: true, field: 'thumbnail', sortable: false },
      { name: 'title', required: true, field: 'title', sortable: true },
    ]

    const rows = ref([])
    return {
      search: ref(null),
      rows,
      columns,
    }
  },

  async mounted() {
    try {
      const token = getToken();
      const response = await api.get('api/v1/article/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status) {
        const data = response.data.data;
        this.rows = data.map(item => ({
          id: item.id,
          date: item.date,
          thumbnail: item.thumbnail,
          title: item.title
        }));
      }
      this.isLoading = false;
    } catch (error) {
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
