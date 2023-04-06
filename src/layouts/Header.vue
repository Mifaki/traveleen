<template>
  <q-layout>
    <q-header class="header row items-center justify-around">
      <p class="neutral-900 jose-b text-2xl q-mb-none">TRAVELEEN</p>
      <div class="nav row">
        <p class="neutral-600 inter-sb text-base q-mb-none">Beranda</p>
        <p class="neutral-600 inter-sb text-base q-mb-none">About</p>
        <p class="neutral-600 inter-sb text-base q-mb-none">Destination</p>
        <p class="neutral-600 inter-sb text-base q-mb-none">Store</p>
      </div>
      <div>
        <q-btn flat label="Masuk" class="neutral-600 text-base" no-caps />
        <q-btn unelevated rounded label="Daftar" class="register-button text-base" no-caps />
      </div>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
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
