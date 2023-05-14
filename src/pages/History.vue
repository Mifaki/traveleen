<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="main-container">
        <p class="inter-b text-4xl neutral-900 q-mb-">Riwayat</p>
        <q-markup-table v-if="isLoading">
          <thead>
            <tr>
              <th class="text-left" style="width: 150px">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
              <th class="text-right">
                <q-skeleton animation="blink" type="text" />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="n in 5" :key="n">
              <td class="text-left">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="50px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="35px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="65px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="25px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-table v-else flat bordered light virtual-scroll :rows="rows" :columns="columns" row-key="index"
          v-model:pagination="pagination" :rows-per-page-options="[0]" hide-pagination
          class="inter-r text-base neutral-900">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="place" :props="props">
                {{ props.row.place }}
              </q-td>
              <q-td key="date" :props="props">
                {{ props.row.date }}
              </q-td>
              <q-td key="time" :props="props">
                {{ props.row.time }}
              </q-td>
              <q-td key="quantity" :props="props">
                {{ props.row.quantity }}
              </q-td>
              <q-td key="total_price" :props="props">
                {{ props.row.total_price }}
              </q-td>
              <q-td key="code" :props="props">
                {{ props.row.code }}
              </q-td>
              <q-td key="status" :props="props">
                {{ props.row.status }}
              </q-td>
            </q-tr>
            <q-tr v-if="props.row.status == 'Berhasil'">
              <q-td>
                <q-btn class="comment-btn" label="Nilai" flat no-caps @click="openDialog(props.row)" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-dialog v-model="comment">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row">
              <q-img :src="commentData.eco_image" class="col-3" />
              <div class="column q-ml-md">
                <div class="row items-center">
                  <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
                  <p class="inter-r text-base neutral-500 q-mb-none q-ml-sm">{{ commentData.eco_location }}</p>
                </div>
                <p class="inter-r text-base emerald-600 q-mb-none q-mt-md">{{ commentData.eco_category }}</p>
                <p class="inter-b text-2xl neutral-900 q-mb-none">{{ commentData.eco_name }}</p>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <p class="inter-b text-2xl neutral-900 q-mb-none">Penilaian</p>
              <q-option-group v-model="rating" :options="ratingOptions" color="green" inline />
              <p class="inter-r text-xs neutral-600 q-mb-none q-mt-md">Bagikan Pengalamanmu</p>
              <q-input v-model="commentBody" outlined type="textarea" />
              <p class="inter-r text-xs neutral-600 q-mb-none q-mt-md">Unggah Foto Perjalananmu (optional)</p>
              <q-input @update:model-value="val => { files = val }" multiple type="file" dense />
            </q-card-section>

            <q-card-actions>
              <q-btn flat label="Kirim" class="submit-comment"
                @click="submitComment(rating, commentBody, commentData.id)" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from "vue"
import { getToken } from "src/utils/localstorage"
import { api } from "src/boot/axios"
import { Notify, useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'

export default {
  name: 'History',

  data() {
    return {
      isLoading: ref(true),
      true: ref(true),
      commentUrl: 'api/v1/tourism/',
      comment: ref(false),
      selectedRow: ref([]),
      commentData: ref([])
    }
  },

  setup() {
    const columns = [
      {
        name: 'place',
        label: 'Tiket',
        align: 'left',
        field: 'place',
        field: row => row.place,
        format: val => `${val}`,
      },
      { name: 'date', align: 'center', label: 'Tanggal Pembelian', field: 'date', sortable: true },
      { name: 'time', align: 'center', label: 'Waktu Pembelian', field: 'time', sortable: true },
      {
        name: 'quantity',
        label: 'Kuantitas',
        field: 'quantity',
        sortable: true,
        format: val => `${val}`
      },
      {
        name: 'total_price',
        align: 'center',
        label: 'Total',
        field: 'total_price',
        sortable: true,
        format: val => `Rp ${val.toLocaleString('en-US')}`
      },
      { name: 'code', align: 'center', label: 'Kode', field: 'code' },
      { name: 'status', label: 'Status', field: 'status' },
      { name: 'id', field: 'id' },
      { name: 'eco_image', field: 'eco_image' },
      { name: 'eco_location', field: 'eco_location' },
      { name: 'eco_category', field: 'eco_category' },
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
      columns,
      rows,
      pagination: ref({
        rowsPerPage: 0
      }),
      files: ref(null),
      rating: ref(1),
      ratingOptions: [
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: '4',
          value: '4',
        },
        {
          label: '5',
          value: '5',
        },
        {
          label: '6',
          value: '6',
        },
        {
          label: '7',
          value: '7',
        },
        {
          label: '8',
          value: '8',
        },
        {
          label: '9',
          value: '9',
        },
        {
          label: '10',
          value: '10',
        },
      ],
      commentBody: ref(''),
      showLoading() {
        $q.loading.show({
          message: 'Pembayaran sedang diproses...'
        })

        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 10000)
      }
    }
  },

  methods: {
    openDialog(row) {
      this.selectedRow = row;
      this.commentData.id = this.selectedRow.id;
      this.commentData.eco_name = this.selectedRow.eco_name;
      this.commentData.eco_image = this.selectedRow.eco_image;
      this.commentData.eco_location = this.selectedRow.eco_location;
      this.commentData.eco_category = this.selectedRow.eco_category;
      this.comment = true;
    },

    resetDefault() {
      this.comment = false;
      this.rating = 1;
      this.commentBody = '';
    },

    async submitComment(argRating, argBody, id) {
      try {
        this.showLoading()
        const token = getToken()
        const formData = new FormData();
        if(this.files) formData.append('thumbnail', this.files);
        formData.append('rating', argRating);
        formData.append('body', argBody);

        const url = `api/v1/tourism/${id}/comment`;
        const response = await api.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        this.$q.loading.hide();
        this.resetDefault()
      } catch (error) {
        this.$q.loading.hide();
        console.log(error)
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan komen silahkan coba kembali',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  async mounted() {
    try {
      const token = getToken();
      const response = await api.get('api/v1/user/history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data);
      if (response.data.status) {
        const data = response.data.data;
        this.rows = data.map(item => ({
          place: item.place,
          date: item.date,
          time: item.time,
          quantity: item.quantity,
          total_price: item.total_price,
          code: item.code,
          status: item.status,
          id: item.id,
          eco_name: item.eco_name,
          eco_image: item.eco_image,
          eco_location: item.eco_location,
          eco_category: item.eco_category
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

<style>
.comment-btn {
  color: white;
  background-color: #10B981;
}

.comment-image {
  width: 100%;
}

.submit-comment {
  background: #10B981;
  color: white;
  width: 100%;
  height: 52px;
}
</style>
