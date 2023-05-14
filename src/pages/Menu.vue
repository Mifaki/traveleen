<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="main-container row">
        <div class="menu-left col-xs-12 col-sm-12 col-md-12 col-lg-4 q-mb-xl">
          <div class="row items-center">
            <q-img v-if="photoProfile" :src="photoProfile" class="profile-image"/>
            <q-img v-else="users.photo_profile" src="/icons/header/profile.svg" class="profile-image" />
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
          <div @click="signOut()" class="row items-center q-mt-md cursor-pointer">
            <q-icon name="img:/icons/menu/logOut.svg" size="24px" />
            <p class="inter-sb text-base red-600 q-mb-none q-ml-md">Keluar</p>
          </div>
        </div>
        <div class="menu-right col-xs-12 col-sm-12 col-md-12 col-lg-8">
          <p class="inter-b text-3xl neutral-900 a-mb-none">Data Personal</p>
          <div class="row justify-between items-center">
            <div class="col-4">
              <p class="inter-r text-sm neutral-600 q-mb-none q-mb-md">Foto Profil</p>
              <q-img v-if="photoProfile" :src="photoProfile" class="edit-image" />
              <q-img v-else="users.photo_profile" src="/icons/header/profile.svg" class="edit-image" />
              <q-input @change="uploadPhoto" @update:model-value="val => { file = val[0] }" flat type="file" class="q-mt-sm" dense />
            </div>
            <div class="row justify-end col-8">
              <q-btn unelevated label="Hapus" class="clear-button text-sm inter-sb q-mr-md" @click="uploadPhoto()" no-caps />
              <q-btn unelevated label="Ubah" class="edit-button text-sm inter-sb" no-caps @click="isEditing" />
            </div>
          </div>
          <q-form @submit="submit">
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm q-mt-lg">Nama Lengkap</p>
            <q-input outlined round v-model="username" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Jenis Kelamin</p>
            <q-option-group v-model="gender" :options="sexOptions" color="primary" class="inter-r text-base neutral-900"
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
                  dense :disable="isDisabled">
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
            <q-input outlined round v-model="region" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">Email</p>
            <q-input outlined round v-model="email" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <p class="inter-r text-sm neutral-600 q-mb-none q-mb-sm">No. Telpon</p>
            <q-input outlined round v-model="contact" :rules="[(val) => !!val]" dense :disable="isDisabled" />
            <q-btn unelevated label="Simpan" class="submit-button text-base inter-sb" no-caps type="submit" />
          </q-form>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { getToken, setToken } from 'src/utils/localstorage';
import { api } from 'src/boot/axios';
import { Notify, useQuasar } from 'quasar';
import { onBeforeUnmount } from 'vue'

export default {
  name: 'Menu',

  data() {
    return {
      profile: {
        name: ref(null),
        email: ref(null)
      }
    }
  },

  setup() {
    const $q = useQuasar()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    return {
      username: ref(null),
      email: ref(null),
      gender: ref('Pria'),
      date: ref(null),
      month: ref(null),
      year: ref(null),
      region: ref(null),
      contact: ref(null),
      photoProfile: ref(null),
      file: ref(null),
      sexOptions: [
        {
          label: 'Pria',
          value: 'Pria'
        },
        {
          label: 'Wanita',
          value: 'Wanita'
        },
      ],
      monthOptions: [
        'Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ],
      isDisabled: ref(true),
      showLoading() {
        $q.loading.show({
          message: 'Memperbaharui Foto Profil...'
        })

        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 10000)
      }
    }
  },

  methods: {
    submit() {
      const birthday = `${this.date} ${this.month} ${this.year}`;
      const isMale = this.gender == "Pria" ? true : false

      const updateData = {
        username: this.username,
        email: this.email,
        contact: this.contact,
        region: this.region,
        gender: isMale,
        birthday: birthday
      }
      try {
        const token = getToken()
        const response = api.put('api/v1/user/update', updateData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.profile.name = updateData.username;
        this.profile.email = updateData.email;
        window.location.reload();
      }
      catch (error) {
        console.log(error);
        Notify.create({
        color: 'red',
        message: 'Gagal mengupdate data silahkan coba kembali',
        position: 'top',
        timeout: 2500
      });
      }
    },

    signOut() {
      setToken(null);
      window.location.reload();
    },

    isEditing() {
      this.isDisabled = !this.isDisabled;
    },

    async uploadPhoto() {
      this.showLoading();

      const isEmpty = this.file == null ? null : this.file;
      const formData = new FormData();
      formData.append('photoProfile', isEmpty);

      try {
        const token = getToken();
        const response = await api.post('api/v1/user/upload/photo', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
      } catch (error) {
        this.$q.loading.hide();
        Notify.create({
        color: 'red',
        message: 'Gagal mengupdate foto silahkan coba kembali',
        position: 'top',
        timeout: 2500
      });
      }
    },

  },

  async mounted() {
    try {
      const token = getToken()
      console.log(token);
      const response = await api.get('api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const responseData = response.data.data
      this.username = this.profile.name = responseData.username;
      this.email = this.profile.email = responseData.email;
      this.contact = responseData.contact;
      this.region = responseData.region;
      this.photoProfile = responseData.photo_profile
      const birthdayParts = responseData.birthday.split(' ');
      this.date = birthdayParts[0];
      this.month = birthdayParts[1];
      this.year = birthdayParts[2];
    }
    catch (error) {
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
