<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="main-container">
        <p class="inter-b text-4xl neutral-900 q-mb-">Riwayat</p>
        <q-table flat bordered light virtual-scroll :rows="rows" :columns="columns" row-key="index"
          v-model:pagination="pagination" :rows-per-page-options="[0]" hide-pagination
          class="inter-r text-base neutral-900" />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from "vue"
import { getToken } from "src/utils/localstorage"
import { api } from "src/boot/axios"

export default {
  name: 'History',

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
      { name: 'date', align: 'center', label: 'Tanggal Pembelian', field: 'date' },
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
    ]
    const rows = ref([])
    return {
      columns,
      rows,
      pagination: ref({
        rowsPerPage: 0
      }),
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
          quantity: item.quantity,
          total_price: item.total_price,
          code: item.code,
          status: item.status
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
