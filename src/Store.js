import { reactive } from 'vue'

export let coin = reactive({
  value: 0
})

export function updateCoinValue(newValue) {
  coin.value = newValue
}
