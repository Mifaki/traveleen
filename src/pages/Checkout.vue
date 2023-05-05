<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-container">
      <p class="inter-b text-3xl neutral-900 q-mb-none">Pemesanan</p>
      <div class="main-checkout q-mt-md">
        <div class="cart row justify-between items-center" v-for="(cart, index) in carts">
          <div class="row col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <img :src="cart.thumbnail" class="col-xs-12 col-sm-7 col-md-7 col-lg-7" />
            <div class="column justify-between q-ml-md col-sm-4 col-md-4 col-lg-4 gt-xs">
              <div class="row items-center">
                <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
                <p class="inter-r text-base neutral-500 q-mb-none q-ml-sm">{{ cart.region }}</p>
              </div>
              <p class="inter-r text-lg emerald-600 q-mb-none">{{ cart.category }}</p>
              <p class="inter-b text-2xl neutral-900 q-mb-none">{{ cart.name }}</p>
              <p class="inter-sb text-xl neutral-900 q-mb-none">Rp {{ formatNumber(cart.price) }}</p>
            </div>
            <div class="q-mt-md col-xs-12 col-sm-4 lt-sm">
              <div class="row">
                <div class="row items-center">
                  <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
                  <p class="inter-r text-base neutral-500 q-mb-none q-ml-sm">{{ cart.region }}</p>
                </div>
                <p class="inter-r text-lg emerald-600 q-mb-none q-ml-lg">{{ cart.category }}</p>
              </div>
              <p class="inter-b text-2xl neutral-900 q-mb-none">{{ cart.name }}</p>
              <p class="inter-sb text-xl neutral-900 q-mb-none">Rp {{ formatNumber(cart.price) }}</p>
            </div>
          </div>
          <div class="quantity-container">
            <q-icon name="img:/icons/Checkout/minus.svg" size="24px" class="cursor-pointer"
              @click="changeQuantity(index, false)" />
            <p class="inter-sb text-lg neutral-50 q-mb-none">{{ cart.quantity }}</p>
            <q-icon name="img:/icons/Checkout/plus.svg" size="24px" class="cursor-pointer"
              @click="changeQuantity(index, true)" />
          </div>
        </div>
        <div class="divider" />
        <div class="row justify-between q-mt-lg">
          <p class="inter-r text-xl neutral-500 q-mb-none">Total</p>
          <p class="inter-b text-2xl neutral-900 q-mb-none">Rp {{ formatNumber(totalPrice()) }}</p>
        </div>
      </div>
      <p class="inter-b text-3xl nautral-900 q-mt-xl">Metode Pembayaran</p>
      <div class="main-checkout">
        <q-option-group v-model="payment" :options="paymentOptions" color="primary"
          class="inter-b text-xl neutral-900 row justify-evenly gt-xs" inline />
          <q-option-group v-model="payment" :options="paymentOptions" color="primary"
          class="inter-b text-xl neutral-900 lt-sm" />
      </div>
      <q-btn unelevated label="Konfirmasi Pemesanan" color="primary" class="payment-button text-base inter-sb q-mt-xl"
        no-caps to="/history" replace />
    </q-page>
  </q-layout>
</template>

<script>
import { coin } from 'src/Store'
import { ref } from 'vue'

export default {
  name: 'Checkout',
  data() {
    return {
      carts: [
        {
          thumbnail: '/icons/Catalog/mountain.jpg',
          region: 'Bali',
          category: 'Pantai',
          name: 'Pantai Nusa Dua',
          price: 10000,
          quantity: 1,
        },
        {
          thumbnail: '/icons/Catalog/waterfall.jpg',
          region: 'Bali',
          category: 'Air Terjun',
          name: 'Tegunungan',
          price: 15000,
          quantity: 1,
        }
      ]
    }
  },

  setup() {
    return {
      payment: ref('coin'),
      paymentOptions: [
        {
          label: `Koin (${coin.value})`,
          value: 'coin'
        },
        {
          label: 'Pembayaran Online',
          value: 'online'
        },
      ]
    }
  },

  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) {
        return '0'
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(',', '.');
    },

    changeQuantity(index, value) {
      console.log(index);
      if (value) {
        this.carts[index].quantity++
      } else {
        this.carts[index].quantity--
        if (this.carts[index].quantity <= 0) {
          this.carts.splice(index, 1)
        }
      }
    },

    totalPrice() {
      return this.carts.reduce((total, cart) => total + cart.price * cart.quantity, 0)
    },
  },
}
</script>

<style>
.cart {
  margin-bottom: 48px;
}
</style>
