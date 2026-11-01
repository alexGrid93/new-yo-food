import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'
import { computed, ref } from 'vue'

const myEmployeeNameFromStorage = localStorage.getItem(LocalStorageKey.MY_EMPLOYEE_NAME)
const selectedEmployeeFromStorage = localStorage.getItem(LocalStorageKey.SELECTED_EMPLOYEE)

const myEmployeeName = ref<string | null>(
  myEmployeeNameFromStorage ?? selectedEmployeeFromStorage,
)

if (!myEmployeeNameFromStorage && selectedEmployeeFromStorage) {
  localStorage.setItem(LocalStorageKey.MY_EMPLOYEE_NAME, selectedEmployeeFromStorage)
}

export const useMyIdentity = () => {
  const setMyEmployeeName = (name: string): void => {
    myEmployeeName.value = name
    localStorage.setItem(LocalStorageKey.MY_EMPLOYEE_NAME, name)
  }

  const isMyNameMissing = (employees: string[]): boolean =>
    !!myEmployeeName.value && employees.length > 0 && !employees.includes(myEmployeeName.value)

  return {
    myEmployeeName: computed(() => myEmployeeName.value),
    setMyEmployeeName,
    isMyNameMissing,
  }
}
