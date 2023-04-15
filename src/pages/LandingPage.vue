<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="headline-landing row justify-end items-center">
        <div class="headline-container col-6">
          <p class="jose-b text-4xl neutral-50 q-mb-none">LINGKUNGKAN YANG TERJAGA, WISATA ALAM YANG BERKESAN DENGAN <span
              class="jose-b text-4xl emerald-600 q-mb-none">TRAVELEEN</span></p>
          <p class="inter-sb text-base neutral-50 q-mb-none">Yuk, jadikan liburanmu lebih berarti dengan Traveleen dan
            turut menjaga kelestarian alam sekitar kita!</p>
          <q-btn v-if="isLoggedIn" unelevated label="Home" to="/home" class="start-button text-base inter-sb q-mt-lg"
            no-caps />
          <q-btn v-else unelevated label="Login" to="/login" class="start-button text-base inter-sb q-mt-lg" no-caps />
        </div>
      </div>
      <div class="q-mx-xl q-px-xl q-mt-xl">
        <div class="landing-desc">
          <p class="inter-b text-4xl neutral-50 q-mb-none text-center">Apa itu Traveleen?</p>
          <p class="inter-sb text-lg neutral-50 q-mb-none q-mt-md">Traveleen adalah sebuah website yang menyediakan
            informasi dan rekomendasi mengenai wisata alam serta
            memberikan fitur untuk menukarkan sampah dengan poin yang dapat digunakan untuk membeli tiket masuk ke tempat
            wisata alam. Selain itu, Traveleen juga memberikan edukasi mengenai pentingnya menjaga lingkungan dan merawat
            bumi.</p>
        </div>
        <div class="feature-landing">
          <p class="inter-b text-5xl neutral-900 q-mb-none q-mb-sm text-center">Fitur Unggulan</p>
          <p class="inter-sb text-base neutral-500 q-mb-none text-center">Nikmati berbagai keuntungan ketika menggunakan
            layanan kami.</p>
          <div class="row justify-evenly q-mt-xl">
            <q-card class="feature-card text-center">
              <q-icon name="img:/icons/LandingPage/feature-1.svg" class="feature-image" />
              <p class="inter-b text-xl neutral-900 q-mb-none q-mt-lg">Cari Destinasi Impianmu</p>
              <p class="inter-r text-base neutral-900 q-mb-none">Temukan berbagai pilihan wisata alam yang sesuai dengan
                minatmu </p>
            </q-card>
            <q-card class="feature-card text-center">
              <q-icon name="img:/icons/LandingPage/feature-2.svg" class="feature-image" />
              <p class="inter-b text-xl neutral-900 q-mb-none q-mt-lg">Bayar Dengan Sampah</p>
              <p class="inter-r text-base neutral-900 q-mb-none">Tukar sampahmu dengan untuk membayar tiket wisata alam
              </p>
            </q-card>
            <q-card class="feature-card text-center">
              <q-icon name="img:/icons/LandingPage/feature-3.svg" class="feature-image" />
              <p class="inter-b text-xl neutral-900 q-mb-none q-mt-lg">Jaga, Pelajari, dan Berkontribusi</p>
              <p class="inter-r text-base neutral-900 q-mb-none">Tingkatkan kesadaranmu tentang pentingnya menjaga alam
                dengan edukasi yang tersedia</p>
            </q-card>
          </div>
        </div>
        <div class="row justify-between items-center q-ma-xl q-py-xl">
          <q-img src="/icons/LandingPage/tagline.png" class="col-6" />
          <div class="col-5">
            <p class="inter-b text-3xl emerald-600 q-mb-none">Cari Destinasi Impianmu</p>
            <p class="inter-r text-base neutral-900 q-mb-none text-justify">Kamu dapat menemukan berbagai pilihan wisata
              alam yang
              dapat disesuaikan dengan minatmu. Dari pantai yang indah hingga gunung yang menantang, Indonesia memiliki
              banyak lokasi wisata alam yang menakjubkan untuk dinikmati. Jangan ragu untuk mengeksplorasi dan menemukan
              tempat yang paling sesuai dengan minatmu.</p>
          </div>
        </div>
      </div>
      <div class="green-tagline row justify-between items-center">
        <div class="col-5">
          <p class="inter-b text-3xl neutral-50 q-mb-none">Bayar Dengan Sampah</p>
          <p class="inter-r text-base neutral-50 q-mb-none text-justify">Kamu dapat menemukan berbagai pilihan wisata alam
            yang
            dapat disesuaikan dengan minatmu. Dari pantai yang indah hingga gunung yang menantang, Indonesia memiliki
            banyak lokasi wisata alam yang menakjubkan untuk dinikmati. Jangan ragu untuk mengeksplorasi dan menemukan
            tempat yang paling sesuai dengan minatmu.</p>
        </div>
        <q-img src="/icons/LandingPage/tagline-2.png" class="col-6" />
      </div>
      <div class="row justify-between items-center q-ma-xl q-pa-xl">
        <q-img src="/icons/LandingPage/tagline-3.png" class="col-6" />
        <div class="col-5">
          <p class="inter-b text-3xl emerald-600 q-mb-none">Cari Destinasi Impianmu</p>
          <p class="inter-r text-base neutral-900 q-mb-none text-justify">Kamu dapat menemukan berbagai pilihan wisata
            alam yang
            dapat disesuaikan dengan minatmu. Dari pantai yang indah hingga gunung yang menantang, Indonesia memiliki
            banyak lokasi wisata alam yang menakjubkan untuk dinikmati. Jangan ragu untuk mengeksplorasi dan menemukan
            tempat yang paling sesuai dengan minatmu.</p>
          <q-btn unelevated label="Selanjutnya" class="education-button text-base inter-sb q-mt-lg" no-caps
            to="/education" />
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
const isLoggedIn = JSON.parse(window.localStorage.getItem("loggedIn"))

export default {
  name: 'LandingPage',
  data() {
    return {
      isLoggedIn
    }
  }
}
</script>

<style>
.start-button {
  color: white;
  background-color: #10B981;
}

.education-button {
  color: white;
  background-color: #10B981;
}
</style>
