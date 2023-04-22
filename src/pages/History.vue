<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="q-mx-xl q-px-xl q-mt-xl">
        <p class="inter-b text-4xl neutral-900 q-mb-">Riwayat</p>
        <q-table flat bordered light virtual-scroll :rows="rows" :columns="columns" row-key="index"
          v-model:pagination="pagination" :rows-per-page-options="[0]" hide-pagination
          class="inter-r text-base neutral-900" />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
export default {
  name: 'History',

  setup() {
    const columns = [
      {
        name: 'name',
        label: 'Jenis',
        align: 'left',
        field: 'name',
        field: row => row.name,
        format: val => `${val}`,
      },
      {
        name: 'quantity',
        label: 'Kuantitas',
        field: 'quantity',
        sortable: true,
        format: val => `${val}`
      },
      {
        name: 'totalPrice',
        align: 'center',
        label: 'Total Saldo',
        field: 'totalPrice',
        sortable: true,
        format: val => `Rp ${val.toLocaleString('en-US')}`
      },
      { name: 'code', align: 'center', label: 'Kode', field: 'code' },
      { name: 'status', label: 'Status', field: 'status' },
    ]
    const rows = [
      {
        id: 1,
        name: "Pantai Nusa Dua, Bali",
        quantity: 1,
        totalPrice: 10000,
        code: "-",
        status: "Menunggu"
      },
      {
        id: 1,
        name: "Air Terjun Tegunungan, Bali",
        quantity: 1,
        totalPrice: 15000,
        code: "K186A442F1",
        status: "Berhasil"
      },
    ]
    return {
      columns,
      rows,
      pagination: ref({
        rowsPerPage: 0
      }),
    }
  }
}
</script>
