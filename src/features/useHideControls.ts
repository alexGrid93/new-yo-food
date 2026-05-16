import { HideControl } from '@/enums/HideControl.ts'
import { ref } from 'vue'
const enteredPassword: HideControl[] = []

export const useHideControls = () => {
  const neededPasswordForActiveHideControls: HideControl[] = [HideControl.LOGO, HideControl.DATE, HideControl.ACTUAL, HideControl.TITLE]

  const isShowHideControls = ref<number>(Number(localStorage.getItem('hc')) || 0)

  const updateEnteredPassword = (control: HideControl): void => {
    enteredPassword.push(control)
  };

  const clickHideControl = (control: HideControl): void => {
    if (Boolean(isShowHideControls.value)) return

    updateEnteredPassword(control)

    if (neededPasswordForActiveHideControls.join('') === enteredPassword.join('')) {
      isShowHideControls.value = 1
      localStorage.setItem('hc', '1')
    }
  }

  return {
    isShowHideControls,
    clickHideControl,
  }
}
