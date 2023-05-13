import { reactive } from 'vue'

export let homeLocation = reactive({
  value: null
})

export let homeType = reactive({
  value: null
})

export function homeSubmitValue(locationvalue, typeValue) {
  homeLocation.value = locationvalue
  homeType.value = typeValue
}
