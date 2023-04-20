<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <!-- temporary checkout page -->
      <q-list bordered class="cart-list">
        <q-item v-for="(item, index) in items" :key="index">
          <q-item-section>
            <p class="inter-r text-base neutral-900 q-mb-none">{{ item.name }}</p>
            <p class="inter-r text-base neutral-500 q-mb-none">{{ item.quantity }} x Rp {{ formatNumber(item.price) }}</p>
          </q-item-section>
          <q-item-section side>
            <q-icon name="close" class="cursor-pointer" @click="removeFromCart(index)" />
          </q-item-section>
        </q-item>
      </q-list>
      <div class="cart-footer row justify-end">
        <p class="inter-r text-lg neutral-900 q-mb-none q-mr-md">Total:</p>
        <p class="inter-r text-lg emerald-600 q-mb-none">Rp {{ formatNumber(totalPrice) }}</p>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Checkout',

  computed: {
    ...mapState('cart', ['items', 'totalPrice']),
  },

  methods: {
    ...mapActions('cart', ['removeFromCart']),
    formatNumber(value) {
      if (value === null || value === undefined) {
        return '0'
      }
      return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(',', '.');
    },
  },
}
</script>
