<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-container">
      <p class="inter-b text-3xl neutral-900 q-mb-none">Pemesanan</p>
      <div class="main-checkout q-mt-md">
        <div class="cart row justify-between items-center" v-for="(cart, index) in carts">
          <div class="row col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <q-img :src="cart.eco_image" class="cart-image col-xs-12 col-sm-7 col-md-7 col-lg-7" />
            <div class="column justify-between q-ml-md col-sm-4 col-md-4 col-lg-4 gt-xs">
              <div class="row items-center">
                <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
                <p class="inter-r text-base neutral-500 q-mb-none q-ml-sm">{{ cart.eco_location }}</p>
              </div>
              <p class="inter-r text-lg emerald-600 q-mb-none">{{ cart.eco_category }}</p>
              <p class="inter-b text-2xl neutral-900 q-mb-none">{{ cart.eco_name }}</p>
              <p class="inter-sb text-xl neutral-900 q-mb-none">Rp {{ formatNumber(calculatePrice(index)) }}</p>
            </div>
            <div class="q-mt-md col-xs-10 col-xs-12 col-sm-4 lt-sm">
              <div class="row">
                <div class="row items-center">
                  <q-icon name="img:/icons/Catalog/region.svg" size="24px" />
                  <p class="inter-r text-base neutral-500 q-mb-none q-ml-sm">{{ cart.eco_location }}</p>
                </div>
                <p class="inter-r text-lg emerald-600 q-mb-none q-ml-lg">{{ cart.eco_category }}</p>
              </div>
              <p class="inter-b text-2xl neutral-900 q-mb-none">{{ cart.eco_name }}</p>
              <p class="inter-sb text-xl neutral-900 q-mb-none">Rp {{ formatNumber(calculatePrice(index)) }}</p>
            </div>
          </div>
          <div class="quantity-counter">
            <q-icon name="img:/icons/Checkout/minus.svg" size="24px" class="cursor-pointer"
              @click="changeQuantity(index, cart.id, false)" />
            <p class="inter-sb text-lg neutral-50 q-mb-none">{{ cart.quantity }}</p>
            <q-icon name="img:/icons/Checkout/plus.svg" size="24px" class="cursor-pointer"
              @click="changeQuantity(index, cart.id, true)" />
          </div>
        </div>
        <div class="divider" />
        <div class="row justify-between q-mt-lg">
          <p class="inter-r text-xl neutral-500 q-mb-none">Total</p>
          <p class="inter-b text-2xl neutral-900 q-mb-none">Rp {{ formatNumber(totalPrice(isCalculate)) }}</p>
        </div>
      </div>
      <p class="inter-b text-3xl nautral-900 q-mt-xl">Metode Pembayaran</p>
      <div class="main-checkout">
        <q-option-group v-if="wallet != 0" v-model="payment" :options="paymentOptions" color="primary"
          class="inter-b text-xl neutral-900 row justify-evenly gt-xs" inline />
        <q-option-group v-if="wallet != 0" v-model="payment" :options="paymentOptions" color="primary"
          class="inter-b text-xl neutral-900 lt-sm" />
      </div>
      <q-btn unelevated label="Konfirmasi Pemesanan" color="primary" class="payment-button text-base inter-sb q-mt-xl"
        no-caps @click="checkoutCart()" replace />
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { getToken } from 'src/utils/localstorage'
import { api } from 'src/boot/axios'
import { Notify, useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'

export default {
  name: 'Checkout',
  data() {
    return {
      carts: [],
      isCalculate: ref(true),
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
      payment: ref('coin'),
      paymentOptions: [
        {
          label: `Koin`,
          value: 'coin'
        },
        {
          label: 'Pembayaran Online',
          value: 'online'
        },
      ],
      showLoading() {
        $q.loading.show({
          message: 'Pembayaran sedang diproses...'
        })

        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 10000)
      },
    }
  },

  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) {
        return '0'
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(',', '.');
    },

    async addToServer(argQuantity, argId) {
      try {
        const token = getToken()
        const url = 'api/v1/tourism/add/' + argId + '/cart';
        this.showLoading
        const response = await api.post(url, {
          quantity: argQuantity
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        Notify.create({
          color: 'green',
          message: 'Berhasil memperbaharui keranjang',
          position: 'top',
          timeout: 2500
        });
      } catch (error) {
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan kedalam keranjang silakan coba kembali',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async removeFromServer(argId) {
      try {
        const token = getToken()
        const url = 'api/v1/tourism/del/' + argId + '/cart';
        const response = await api.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        Notify.create({
          color: 'green',
          message: 'Berhasil menghapus dari keranjang',
          position: 'top',
          timeout: 2500
        });
      } catch (error) {
        Notify.create({
          color: 'red',
          message: 'Gagal menghapus dari keranjang',
          position: 'top',
          timeout: 2500
        });
      }
    },

    changeQuantity(index, id, value) {
      this.isCalculate = true;
      if (value) {
        this.carts[index].quantity++;
      } else {
        this.carts[index].quantity--;
        if (this.carts[index].quantity <= 0) {
          this.removeFromServer(id);
          this.carts.splice(index, 1);
          return;
        }
      }
      this.addToServer(this.carts[index].quantity, id);
    },

    calculatePrice(index) {
      if (this.isCalculate) {
        return this.carts[index].price_per_product * this.carts[index].quantity;
      } else {
        return this.carts[index].price
      }
    },

    totalPrice() {
      return this.carts.reduce((total, cart) => total + cart.price_per_product * cart.quantity, 0)
    },

    async checkoutCart() {
      const isOnline = this.payment == "online" ? true : false;
      this.showLoading();
      try {
        const token = getToken()
        const response = await api.post('api/v1/user/payment', {
          is_online_payment: isOnline
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (isOnline) {
          const url = response.data.data.url
          window.location.href = url;
        } else {
          this.$router.push('/history')
        }
      }
      catch (error) {
        this.$q.loading.hide()
        Notify.create({
          color: 'red',
          message: 'Pembayaran gagal silakan coba kembali',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  async mounted() {
    try {
      const token = getToken()
      const cartResponse = await api.get('api/v1/user/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.carts = cartResponse.data.data.cart_product.map((cartProduct) => {
        return {
          id: cartProduct.eco_id,
          eco_image: cartProduct.eco_image,
          eco_location: cartProduct.eco_location,
          eco_category: cartProduct.eco_category,
          eco_name: cartProduct.eco_name,
          price: cartProduct.price,
          price_per_product: cartProduct.price_per_product,
          quantity: cartProduct.quantity
        };
      });

      this.isCalculate = false;
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
.cart {
  margin-bottom: 48px;
}

.cart-image {
  max-width: 244px;
  max-height: 169px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
