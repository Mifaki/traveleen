<template>
  <q-layout>
    <q-header class="header column justify-center">
      <div class="main-container-no-top row items-center justify-between">
        <q-item class="row" clickable to="/home" replace>
          <q-icon name="img:/icons/icon.svg" size="33px" class="q-mr-sm" />
          <p class="neutral-900 jose-b text-2xl q-mb-none">TRAVELEEN</p>
        </q-item>
        <div v-if="loggedIn">
          <div class="row items-center gt-sm">
            <div class="row q-mr-xl">
              <RouterLink to="/">
                <p class="inter-sb text-base neutral-600 q-mb-none">Tentang</p>
              </RouterLink>
              <RouterLink to="/history">
                <p class="inter-sb text-base neutral-600 q-mb-none q-mx-lg">Riwayat</p>
              </RouterLink>
              <RouterLink to="/balance">
                <p class="inter-sb text-base neutral-600 q-mb-none">Koin <span
                    class="inter-sb text-base emerald-600 q-mb-none">({{ formatNumber(users.wallet) }})</span></p>
              </RouterLink>
            </div>
            <q-item clickable to="/menu" replace class="row items-center">
              <q-img v-if="users.photo_profile" :src="users.photo_profile" class="profile-image" />
              <q-icon v-else name="img:/icons/header/profile.svg" size="64px" />
              <P class="inter-sb text-base neutral-600 q-mb-none q-ml-md">{{ users.username }}</P>
            </q-item>
          </div>
          <div class="lt-md">
            <q-btn flat @click="drawer = !drawer" round text-color="grey-10" icon="menu" />
            <q-drawer v-model="drawer">
              <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                  <q-item clickable to="/">
                    <p class="inter-sb text-base neutral-600 q-mb-none">Tentang</p>
                  </q-item>
                  <q-item clickable to="/history">
                    <p class="inter-sb text-base neutral-600 q-mb-none">Riwayat</p>
                  </q-item>
                  <q-item clickable to="/balance">
                    <p class="inter-sb text-base neutral-600 q-mb-none">Koin <span
                        class="inter-sb text-base emerald-600 q-mb-none">({{ formatNumber(users.wallet) }})</span></p>
                  </q-item>
                </q-list>
              </q-scroll-area>
              <q-item clickable to="/menu" class="row items-center absolute-top bg-transparent q-pa-lg">
                <q-avatar size="56px" class="q-mb-sm q-mr-md">
                  <q-img v-if="users.photo_profile" :src="users.photo_profile" class="profile-image" />
                  <img v-else="users.photo_profile" src="/icons/header/profile.svg" />
                </q-avatar>
                <div>
                  <p class="inter-sb text-lg neutral-900 q-mb-none">{{ users.username }}</p>
                  <p class="inter-r text-md neutral-600 q-mb-none">{{ users.email }}</p>
                </div>
              </q-item>
            </q-drawer>
          </div>
        </div>
        <div v-else>
          <div class="gt-sm">
            <q-btn flat label="Tentang" class="neutral-600 text-base" no-caps to="/about" replace />
            <q-btn flat label="Masuk" class="neutral-600 text-base" no-caps to="/login" replace />
            <q-btn unelevated rounded label="Daftar" class="register-button text-base" no-caps to="/register" replace />
          </div>
          <div class="lt-md">
            <div class="lt-md">
              <q-btn flat @click="drawer = !drawer" round text-color="grey-10" icon="menu" />
              <q-drawer v-model="drawer">
                <q-list padding>
                  <q-item clickable to="/login">
                    <p class="inter-sb text-base neutral-600 q-mb-none">Masuk</p>
                  </q-item>
                  <div class="divider" />
                  <q-item clickable to="/register">
                    <p class="inter-sb text-base neutral-600 q-mb-none">Daftar</p>
                  </q-item>
                  <div class="divider" />
                  <q-item clickable to="/">
                    <p class="inter-sb text-base neutral-600 q-mb-none">Tentang</p>
                  </q-item>
                  <div class="divider" />
                  <q-item clickable to="/history">
                    <p class="inter-sb text-base neutral-600 q-mb-none">Riwayat</p>
                  </q-item>
                </q-list>
              </q-drawer>
            </div>
          </div>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <RouterView></RouterView>
    </q-page-container>
    <q-footer class="footer">
      <div class="main-container text-center">
        <p class="jose-b text-2xl q-mb-none q-mb-sm">TRAVELEEN</p>
        <p class="inter-r text-base q-mb-none">"Lingkungan yang Terjaga, Wisata Alam yang Berkesan dengan Traveleen"</p>
        <div class="nav row justify-center q-mt-sm">
          <q-item clickable to="/home">
            <p class="inter-sb text-base neutral-50 q-mb-none">Beranda</p>
          </q-item>
          <q-item clickable to="/">
            <p class="inter-sb text-base neutral-50 q-mb-none">About</p>
          </q-item>
          <q-item clickable to="/catalog">
            <p class="inter-sb text-base neutral-50 q-mb-none">Destination</p>
          </q-item>
          <q-item clickable to="/ini kmn?">
            <p class="inter-sb text-base neutral-50 q-mb-none">Store</p>
          </q-item>
        </div>
      </div>
      <div class="footer-bottom items-center">
        <div class="footer-bottom-left gt-xs" />
        <div class="footer-contact row justify-evenly">
          <q-icon name="img:/icons/Footer/facebook.svg" size="24px" />
          <q-icon name="img:/icons/Footer/twitter.svg" size="24px" />
          <q-icon name="img:/icons/Footer/linkedin.svg" size="24px" />
          <q-icon name="img:/icons/Footer/instagram.svg" size="24px" />
        </div>
        <div class="footer-bottom-right gt-xs" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { api } from 'src/boot/axios';
import { getToken, setIsLoggedIn } from "src/utils/localstorage";
import { ref } from 'vue'
import { Notify } from 'quasar';

export default {

  async mounted() {
    try {
      const token = getToken()
      if(token != null) {
        console.log(token);
        const response = await api.get('api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.users = response.data.data
        console.log(this.users);
        this.loggedIn = true;

        setIsLoggedIn(true);
      }
    }
    catch (error) {
      console.log(error);
      if (error.response.data.message == "Invalid JWT token") {
        Notify.create({
          color: 'red',
          message: 'Sesi telah berakhir silahkan login kembali',
          position: 'top',
          timeout: 2500
        });
        this.$router.push('/login');
      }
    }
  },

  data() {
    return {
      users: null,
      loggedIn: false,
      drawer: ref(false)
    }
  },

  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) {
        return '0'
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(',', '.');
    },
  }
}
</script>

<style>
.header {
  height: 100px;
  max-height: 100px;
  background-color: white;
}

.register-button {
  color: white;
  background-color: #10B981;
  width: 97px;
  height: 52px;
}

.profile-image {
  width: 64px;
  height: 64px;
  border-radius: 50px;
}
</style>
