<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="q-mx-xl q-px-xl q-mt-md">
        <div class="balance-header row justify-evenly items-center">
          <div class="coint-container text-center">
            <p class="inter-sb text-xl neutral-900 q-mb-none">Total Saldo</p>
            <P class="inter-b text-4xl  emerald-600 q-mb-none">Rp {{ formatNumber(balanceCoin) }}</P>
          </div>
          <div clickable @click="type = true" class="text-center cursor-pointer">
            <q-icon name="img:/icons/Balance/redeemTrash.svg" size="64px" />
            <p class="inter-b text-2xl neutral-50 q-mb-none">Tukar Sampah</p>
          </div>
          <div class="text-center">
            <q-icon name="img:/icons/Balance/topUp.svg" size="64px" />
            <p class="inter-b text-2xl neutral-50 q-mb-none">Isi Saldo</p>
          </div>
        </div>
        <q-dialog v-model="type">
          <q-card>
            <q-card-section class="text-center items-center q-pb-none">
              <p class="inter-b text-4xl neutral-900 q-mb-none">Tukar Sampah</p>
              <P class="inter-sb text-lg neutral-500 q-mb-none q-mt-xs">Kumpulkan sampahmu, tukar dengan uang, dan nikmati
                liburan
                menyenangkan!</P>
            </q-card-section>
            <q-card-section class="q-mt-xl">
              <p class="inter-md text-sm neutral-500 q-mb-none">Jenis Sampah</p>
              <q-select rounded outlined v-model="chooseType" :options="typeOptions" clearable
                class="inter-r text-base q-mt-sm" dense>
                <template v-slot:selected>
                  <template v-if="chooseType">
                    {{ chooseType }}
                  </template>
                  <template v-else>Pilih Jenis</template>
                </template>
              </q-select>
              <q-btn unelevated color="primary" label="Selanjutnya" no-caps class="dialog-buttons q-mt-lg"
                @click="quantity = true" :disable="chooseType == null" />
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="quantity">
          <q-card class="quantity-container">
            <q-card-section>
              <q-img src="/icons/Balance/plastic.jpg" />
            </q-card-section>
            <q-card-section class="row q-mt-lg">
              <div>
                <p class="inter-r text-md neutral-500 q-mb-none q-mb-sm">Jenis Sampah</p>
                <P class="inter-r text-md neutral-500 q-mb-none">Nilai Penukaran</P>
              </div>
              <div class="q-ml-xl">
                <p class="inter-sb text-md neutral-900 q-mb-none q-mb-sm">{{ chooseType }}</p>
                <P class="inter-sb text-md neutral-900 q-mb-none">Rp.20.000/kg</P>
              </div>
            </q-card-section>
            <q-card-section class="q-mt-lg">
              <p class="inter-sb text-md neutral-500 q-mb-none q-mb-sm">Berat Sampah</p>
              <q-input v-model.number="weight" type="number" outlined dense suffix="Kg" />
              <q-btn outline color="red" label="Batal" class="dialog-buttons q-mt-lg q-mb-md"
                @click="quantity = false, type = false" />
              <q-btn unelevated color="primary" label="Selanjutnya" class="dialog-buttons"
                @click="newTrash(chooseType, weight)" />
            </q-card-section>
          </q-card>
        </q-dialog>
        <P class="inter-b text-4xl neutral-900 q-mb-none q-my-lg">Riwayat</P>
        <q-table flat bordered light virtual-scroll :rows="rows" :columns="columns" row-key="index"
          v-model:pagination="pagination" :rows-per-page-options="[0]" hide-pagination
          class="inter-r text-base neutral-900" />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { updateCoinValue } from 'src/Store'

export default {
  name: 'Balance',

  data() {
    return {
      trash: {
        type: ref(null),
        weight: ref(null),
        location: ref(null),
        balance: ref(null),
        code: ref(null),
        status: ref(null)
      },
      totalBalance: ref(null),
    }
  },

  setup() {
    const columns = [
      {
        name: 'type',
        required: true,
        label: 'Jenis',
        align: 'left',
        field: row => row.type,
        format: val => `${val}`,
      },
      {
        name: 'location',
        align: 'center',
        label: 'Lokasi Sektor',
        field: row => row.location ? row.location : '-'
      },
      {
        name: 'weight',
        label: 'Berat',
        field: 'weight',
        sortable: true,
        format: val => `${val} Kg`
      },
      {
        name: 'balance',
        align: 'center',
        label: 'Total Saldo',
        field: 'balance',
        sortable: true,
        format: val => `Rp ${val.toLocaleString('en-US')}`
      },
      { name: 'code', align: 'center', label: 'Kode', field: 'code' },
      { name: 'status', label: 'Status', field: 'status' },
    ]
    const originalRows = [
      {
        id: 1,
        type: "Plastik",
        location: null,
        weight: 1,
        balance: 20000,
        code: "P102A938L7",
        status: "Menunggu"
      },
      {
        id: 2,
        type: "Kertas",
        location: "Pantai Nusa Dua, Bali",
        weight: 2,
        balance: 20000,
        code: "K186A442F1",
        status: "Berhasil"
      },
      {
        id: 3,
        type: "Plastik  ",
        location: "Pantai Nusa Dua, Bali",
        weight: 0.4,
        balance: 8000,
        code: "P224A611L3",
        status: "Berhasil"
      },
      {
        id: 4,
        type: "Kardus",
        location: null,
        weight: 0.9,
        balance: 13500,
        code: "K717B529D7",
        status: "Gagal"
      },
    ]
    const rows = ref([...originalRows])
    return {
      columns,
      rows,
      originalRows,
      pagination: ref({
        rowsPerPage: 0
      }),
      type: ref(false),
      chooseType: ref(null),
      typeOptions: [
        'Kertas', 'Elektronik', 'Plastik', 'Kaca', 'Metal', 'Kardus', 'Organik'
      ],
      quantity: ref(false),
      weight: ref(1),
    }
  },

  methods: {
    formatNumber(value) {
      return value.toLocaleString('en-US');
    },

    resetDefault() {
      this.quantity = false;
      this.type = false;
      this.chooseType = null;
      this.weight = 1;
    },

    generateCode() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let code = '';

      while (true) {
        code = '';
        for (let i = 0; i < 3; i++) {
          code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 3; i++) {
          code += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        for (let i = 0; i < 3; i++) {
          code += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        if (!this.rows.some(row => row.code === code)) {
          return code;
        }
      }
    },

    newTrash(argType, argWeight) {
      this.trash.type = argType;
      this.trash.weight = argWeight;
      this.trash.code = this.generateCode()
      this.trash.balance = 20000
      this.trash.status = "Menunggu"
      this.rows.push(this.trash)
      this.resetDefault();
    },
  },

  computed: {
    balanceCoin() {
      this.totalBalance = this.rows.reduce((sum, row) => sum + row.balance, 0);
      updateCoinValue(this.totalBalance);
      return this.totalBalance ;
    }
  }
}
</script>

<style>
.dialog-buttons {
  width: 100%;
  height: 48px;
}

.quantity-container {
  width: 100%;
  height: fit-content;
  background: white;
  padding: 32px 16px;
}
</style>
