<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="main-container row">
        <div class="menu-left col-xs-12 col-sm-12 col-md-12 col-lg-4 q-mb-xl">
          <div class="row items-center">
            <q-icon name="img:/icons/header/profile.svg" size="48px" />
            <div class="col-8 q-ml-md">
              <p class="inter-sb text-lg neutral-900 q-mb-none">{{ profile.name }}</p>
              <P class="inter-r text-lg neutral-600 q-mb-none">{{ profile.email }}</P>
            </div>
          </div>
          <div class="divider q-my-lg" />
          <div class="row items-center">
            <q-icon name="img:/icons/menu/orders.svg" size="24px" />
            <p class="inter-sb text-base neutral-600 q-mb-none q-ml-md">Pemesanan Saya</p>
          </div>
          <div class="row items-center q-mt-md">
            <q-icon name="img:/icons/menu/promo.svg" size="24px" />
            <p class="inter-sb text-base neutral-600 q-mb-none q-ml-md">Informasi Promo</p>
          </div>
          <div class="divider q-my-lg" />
          <div class="row items-center">
            <q-icon name="img:/icons/menu/settings.svg" size="24px" />
            <p class="inter-sb text-base neutral-600 q-mb-none q-ml-md">Sunnting Akun</p>
          </div>
          <div class="row items-center q-mt-md">
            <q-icon name="img:/icons/menu/logOut.svg" size="24px" />
            <p class="inter-sb text-base red-600 q-mb-none q-ml-md">Keluar</p>
          </div>
        </div>
        <div class="menu-right col-xs-12 col-sm-12 col-md-12 col-lg-8">
          <p class="inter-b text-3xl neutral-900 a-mb-none">Data Personal</p>
          <div class="row justify-between items-center">
            <div>
              <p class="inter-r text-sm neutral-600 q-mb-none q-mb-md">Foto Profil</p>
              <q-icon name="img:/icons/header/profile.svg" size="64px" />
            </div>
            <div class="row">
              <q-btn unelevated label="Hapus" class="clear-button text-sm inter-sb q-mr-md" no-caps />
              <q-btn unelevated label="Ubah" class="edit-button text-sm inter-sb" no-caps @click="isEditing" />
            </div>
          </div>
          <q-form @submit="submit">
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm q-mt-lg">Nama Lengkap</p>
            <q-input outlined round v-model="name" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Jenis Kelamin</p>
            <q-option-group v-model="sex" :options="sexOptions" color="primary" class="inter-r text-base neutral-900"
              inline :disable="isDisabled" />
            <div class="row justify-between q-mt-lg">
              <div class="col-2">
                <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Tanggal</p>
                <q-input outlined round v-model="date" :rules="[(val) => !!val]" dense :disable="isDisabled" />
              </div>
              <div class="col-6">
                <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Bulan</p>
                <q-select outlined v-model="month" :options="monthOptions" clearable
                  class="inter-r text-base emerald-600 q-mr-lg" transition-show="jump-down" transition-hide="jump-up"
                  dense :disable="isDisabled" >
                  <template v-slot:selected>
                    <template v-if="month">
                      {{ month }}
                    </template>
                    <template v-else></template>
                  </template>
                </q-select>
              </div>
              <div class="col-2">
                <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Tahun</p>
                <q-input outlined round v-model="year" :rules="[(val) => !!val]" dense :disable="isDisabled" />
              </div>
            </div>
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Kota</p>
            <q-input outlined round v-model="city" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Email</p>
            <q-input outlined round v-model="email" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">No. Telpon</p>
            <q-input outlined round v-model="phoneNumber" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <q-btn unelevated label="Simpan" class="submit-button text-base inter-sb" no-caps type="submit" />
          </q-form>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Menu',

  data() {
    return {
      profile: {
        name: "Arthur Morgan",
        email: 'arthurmorgan@gmail.com'
      }
    }
  },

  setup() {
    return {
      name: 'Arthur Morgan',
      sex: ref('man'),
      date: '21',
      month: ref('Januari'),
      year: '2002',
      city: 'Depok',
      email: 'arthurmorgan@gmail.com',
      phoneNumber: '087865392929',
      sexOptions: [
        {
          label: 'Pria',
          value: 'man'
        },
        {
          label: 'Wanita',
          value: 'woman'
        },
      ],
      monthOptions: [
        'Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ],
      isDisabled: ref(true),
    }
  },

  methods: {
    submit() {
      const updateData = {
        name: this.name,
        sex: this.sex,
        date: this.date,
        month: this.month,
        year: this.year,
        city: this.city,
        email: this.email,
        phoneNumber: this.phoneNumber,
      }

      this.profile.name = updateData.name;
      this.profile.email = updateData.email;
    },

    isEditing() {
      this.isDisabled = !this.isDisabled;
    }
  }
}
</script>

<style>
.clear-button {
  color: white;
  background-color: #DC2626;
}

.edit-button {
  color: white;
  background-color: #10B981;
}

.submit-button {
  width: 100%;
  height: 48px;
  color: white;
  background-color: #10B981;
}
</style>
