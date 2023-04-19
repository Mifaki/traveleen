<template>
  <q-layout>
    <q-header class="header column justify-center">
      <div class="row items-center justify-between q-mx-xl q-px-xl">
        <div class="row">
          <q-icon name="img:/icons/icon.svg" size="33px" class="q-mr-sm" />
          <p class="neutral-900 jose-b text-2xl q-mb-none">TRAVELEEN</p>
        </div>
        <div v-if="loggedIn" class="row items-center">
          <div class="row q-mr-xl">
            <router-link to="/">
              <p class="inter-sb text-base neutral-600 q-mb-none">Tentang</p>
            </router-link>
            <router-link to="/history">
              <p class="inter-sb text-base neutral-600 q-mb-none q-mx-lg">Riwayat</p>
            </router-link>
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
      <router-view></router-view>
    </q-page-container>
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
      window.localStorage.setItem('loggedIn', JSON.stringify(true));
    }
    catch (error) {
      console.log(error);
    }
  }
}
</script>

<style>
.register-button {
  color: white;
  background-color: #10B981;
  width: 97px;
  height: 52px;
}
</style>
