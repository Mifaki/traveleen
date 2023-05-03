import { reactive } from 'vue'

export let coin = reactive({
  value: 0
})

export let homeLocation = reactive({
  value: null
})

export let homeType = reactive({
  value: null
})

export function updateCoinValue(newValue) {
  coin.value = newValue
}

export function homeSubmitValue(locationvalue, typeValue) {
  homeLocation.value = locationvalue
  homeType.value = typeValue
}
