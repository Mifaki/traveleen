<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="main-container-no-top q-mt-md">
        <div class="balance-header row justify-evenly items-center">
          <div class="coint-container text-center col-sm-12 col-md-6 col-lg-6">
            <p class="inter-sb text-xl neutral-900 q-mb-none">Total Saldo</p>
            <P v-if="users" class="inter-b text-4xl  emerald-600 q-mb-none">Rp {{ formatNumber(users.wallet) }}</P>
            <P v-else class="inter-b text-4xl  emerald-600 q-mb-none">Rp 0</P>
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
                @click="setQuantityAndPricePerKg" :disable="chooseType == null" />
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="quantity">
          <q-card class="quantity-container">
            <q-card-section>
              <q-img src="/icons/Balance/plastic.jpg" />
            </q-card-section>
            <q-card-section class="row justify-between q-mt-lg">
              <div>
                <p class="inter-r text-md neutral-500 q-mb-none q-mb-sm">Jenis Sampah</p>
                <P class="inter-r text-md neutral-500 q-mb-none">Nilai Penukaran</P>
              </div>
              <div class="q-ml-xl">
                <p class="inter-sb text-md neutral-900 q-mb-none q-mb-sm">{{ chooseType }}</p>
                <P class="inter-sb text-md neutral-900 q-mb-none">Rp {{ getPricePerKg() }}</P>
              </div>
            </q-card-section>
            <q-card-section class="q-mt-lg">
              <p class="inter-sb text-md neutral-500 q-mb-none q-mb-sm">Berat Sampah</p>
              <q-input v-model.number="weight" type="number" outlined dense suffix="Kg" />
              <q-btn outline color="red" label="Batal" class="dialog-buttons q-mt-lg q-mb-md"
                @click="quantity = false, type = false" />
              <q-btn unelevated color="primary" label="Selanjutnya" class="dialog-buttons"
                @click="updateTrash(chooseType, weight)" />
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
import { getToken } from 'src/utils/localstorage'
import { api } from 'src/boot/axios'

export default {
  name: 'Balance',

  data() {
    return {
      totalBalance: ref(null),
      users: ref(null)
    }
  },

  setup() {
    const columns = [
      {
        name: 'category',
        required: true,
        label: 'Jenis',
        align: 'left',
        field: row => row.category,
        format: val => `${val}`,
      },
      {
        name: 'location',
        align: 'center',
        label: 'Lokasi Sektor',
        field: row => row.location ? row.location : '-'
      },
      {
        name: 'mass',
        label: 'Berat',
        field: 'mass',
        sortable: true,
        format: val => `${val} Kg`
      },
      {
        name: 'exchange_totals',
        align: 'center',
        label: 'Total Saldo',
        field: 'exchange_totals',
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
      if (value === null || value === undefined) {
        return '0'
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(',', '.');
    },

    setQuantityAndPricePerKg() {
      this.quantity = true;
      this.getPricePerKg();
    },

    getPricePerKg() {
      switch (this.chooseType) {
        case 'Plastik':
          return '2.000'
        case 'Kaca':
          return '5.000';
        case 'Kertas':
          return '1.000';
        case 'Elektronik':
          return '25.000';
        case 'Metal':
          return '15.000';
        case 'Kardus':
          return '7.000';
        case 'Organik':
          return '2.000';
        default:
          return '0';
      }
    },

    resetDefault() {
      this.quantity = false;
      this.type = false;
      this.chooseType = null;
      this.weight = 1;
    },

    async updateTrash(argType, argWeight) {
      try {
        const token = getToken();
        const response = await api.post('api/v1/trash/exchange', {
          category: argType,
          mass: argWeight
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data.data;
        console.log(data);
        const trash = {
          category: data.category,
          location: data.location !== '-' ? data.location : null,
          mass: data.mass,
          exchange_totals: data.exchange_totals,
          code: data.code,
          status: data.status
        };
        this.rows.push(trash);
        const userResponse = await api.get('api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.users.wallet = userResponse.data.data.wallet;
        this.resetDefault();
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    try {
      const token = getToken();
      const historyResponse = await api.get('api/v1/trash/exchange/history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (historyResponse.data.status) {
        const data = historyResponse.data.data;
        this.rows = data.map(item => ({
          category: item.category,
          location: item.location !== '-' ? item.location : null,
          mass: item.mass,
          exchange_totals: item.exchange_totals,
          code: item.code,
          status: item.status
        }));
      }

      const userResponse = await api.get('api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.users = userResponse.data.data
      console.log(this.users);
    } catch (error) {
      console.log(error);
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
  height: fit-content;
  width: 700px;
  max-width: 80vw;
  background: white;
  padding: 24px 16px;
}
</style>
