<template>
  <q-layout>
    <q-header class="header column justify-center">
      <div class="row items-center justify-between q-mx-xl q-px-xl">
        <div class="row">
          <q-icon name="img:/icons/icon.svg" size="33px" class="q-mr-sm" />
          <p class="neutral-900 jose-b text-2xl q-mb-none">TRAVELEEN</p>
        </div>
        <div v-if="loggedIn" class="row items-center">
          <div class="row q-mr-xl">]
            <RouterLink to="/">
              <p class="inter-sb text-base neutral-600 q-mb-none">Tentang</p>
            </RouterLink>
            <RouterLink to="/history">
              <p class="inter-sb text-base neutral-600 q-mb-none q-mx-lg">Riwayat</p>
            </RouterLink>
            <p class="inter-sb text-base neutral-600 q-mb-none">Koin <span
                class="inter-sb text-base emerald-600 q-mb-none">({{ coin }})</span></p>
          </div>
          <q-item clickable to="/menu" replace class="row items-center">
            <q-icon name="img:/icons/header/profile.svg" size="64px" />
            <P class="inter-sb text-base neutral-600 q-mb-none q-ml-md">{{ users.data.first_name }}</P>
          </q-item>
        </div>
        <div v-else>
          <q-btn flat label="Tentang" class="neutral-600 text-base" no-caps to="/about" replace />
          <q-btn flat label="Masuk" class="neutral-600 text-base" no-caps to="/login" replace />
          <q-btn unelevated rounded label="Daftar" class="register-button text-base" no-caps to="/register" replace />
        </div>
      </div>
    </q-header>
    <q-page-container>
      <RouterView></RouterView>
    </q-page-container>
    <q-footer class="footer">
      <div class="footer-container q-mx-auto text-center">
        <p class="jose-b text-2xl q-mb-none q-mb-sm">TRAVELEEN</p>
        <p class="inter-r text-base q-mb-none">"Lingkungan yang Terjaga, Wisata Alam yang Berkesan dengan Traveleen"</p>
        <div class="nav row justify-center q-mt-sm">
          <p class="inter-sb text-base q-mb-none">Beranda</p>
          <p class="inter-sb text-base q-mb-none">About</p>
          <p class="inter-sb text-base q-mb-none">Destination</p>
          <p class="inter-sb text-base q-mb-none">Store</p>
        </div>
      </div>
      <div class="footer-bottom row justify-between items-center">
        <div class="footer-bottom-left" />
        <div class="footer-contact row justify-evenly">
          <q-icon name="img:/icons/Footer/facebook.svg" size="24px" />
          <q-icon name="img:/icons/Footer/twitter.svg" size="24px" />
          <q-icon name="img:/icons/Footer/linkedin.svg" size="24px" />
          <q-icon name="img:/icons/Footer/instagram.svg" size="24px" />
        </div>
        <div class="footer-bottom-right" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { api } from 'src/boot/axios';

export default {

  async mounted() {
    try {
      const response = await api.get('/api/users/2')
      this.users = response.data
      console.log(this.users);
      this.loggedIn = true;
      window.localStorage.setItem('loggedIn', JSON.stringify(true));
    }
    catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      users: null,
      loggedIn: false,
      coin: 28000
    }
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
</style>
