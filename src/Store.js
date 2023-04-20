import { reactive } from 'vue'

export let coin = reactive({
  value: 28000
})

export function updateCoinValue(newValue) {
  coin.value = newValue
}
