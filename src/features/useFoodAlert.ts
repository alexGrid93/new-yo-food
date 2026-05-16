import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'
import { currentDayView, DaysMap } from '@/utils/constants.ts'
import { type Ref, ref } from 'vue'

interface IUseFoodAlert {
  isShow: Ref<boolean>
  onClose: () => void
  remindMeLater: () => void
}

const REMIND_MINUTES = 30

const isClosedTodayOrYesterday = (dateStr: string): boolean => {
  const closeDate = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  return (
    closeDate.toDateString() === today.toDateString() ||
    closeDate.toDateString() === yesterday.toDateString()
  )
}

const isRemindAgain = (lastRemindTime: string): boolean => {
  const lastRemind = new Date(lastRemindTime).getTime()
  const now = Date.now()
  const diffMs = now - lastRemind
  const diffMinutes = diffMs / (1000 * 60)

  return diffMinutes >= REMIND_MINUTES
};

export const useFoodAlert = (): IUseFoodAlert => {
  const isShow = ref<boolean>(false);

  const daysForShow = [DaysMap.Thu, DaysMap.Fri];

  const lastCloseFoodAlertValue = localStorage.getItem(LocalStorageKey.LAST_CLOSE_FOOD_ALERT)
  const remindMeClickTime = localStorage.getItem(LocalStorageKey.REMIND_ME_CLICK_TIME)

  const isAllowedDay = daysForShow.includes(currentDayView)
  const isNotClosedRecently = !lastCloseFoodAlertValue || !isClosedTodayOrYesterday(lastCloseFoodAlertValue)
  const isRemind = !remindMeClickTime || isRemindAgain(remindMeClickTime)

  if (isAllowedDay && isNotClosedRecently && isRemind) {
    isShow.value = true
  }

  const onClose = (): void => {
    localStorage.setItem(LocalStorageKey.LAST_CLOSE_FOOD_ALERT, new Date().toDateString())
    isShow.value = false
  };

  const remindMeLater = (): void => {
    isShow.value = false
    localStorage.setItem(LocalStorageKey.REMIND_ME_CLICK_TIME, new Date().toISOString())
  };

  return {
    isShow,
    onClose,
    remindMeLater,
  }
};
