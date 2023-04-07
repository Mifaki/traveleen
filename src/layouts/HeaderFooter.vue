<template>
  <q-layout>
    <q-header class="header row items-center justify-around">
      <div class="row">
        <q-icon name="img:/icons/icon.svg" size="33px" class="q-mr-sm" />
        <p class="neutral-900 jose-b text-2xl q-mb-none">TRAVELEEN</p>
      </div>
      <div class="nav row">
        <p class="neutral-600 inter-sb text-base q-mb-none">Beranda</p>
        <p class="neutral-600 inter-sb text-base q-mb-none">About</p>
        <p class="neutral-600 inter-sb text-base q-mb-none">Destination</p>
        <p class="neutral-600 inter-sb text-base q-mb-none">Store</p>
      </div>
      <div v-if="loggedIn">
        <q-icon name="img:/icons/header/notification.svg" size="32px" class="q-mr-lg"/>
        <q-icon name="img:/icons/header/profile.svg" size="64px" />
      </div>
      <div v-else>
        <q-btn flat label="Masuk" class="neutral-600 text-base" no-caps to="/login" replace />
        <q-btn unelevated rounded label="Daftar" class="register-button text-base" no-caps to="/register" replace />
      </div>
    </q-header>
    <q-page-container>
      <router-view></router-view>
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
  data() {
    return {
      users: null,
      loggedIn: false
    }
  },

  async mounted() {
    try {
      const response = await api.get('/api/users/2')
      this.users = response.data
      console.log(this.users);
      this.loggedIn = true;
    }
    catch (error) {
      console.log(error);
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

.nav {
  gap: 32px;
}

.register-button {
  color: white;
  background-color: #10B981;
  width: 97px;
  height: 52px;
}
</style>
