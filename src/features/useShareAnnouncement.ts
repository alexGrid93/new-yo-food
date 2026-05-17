import { ref, type Ref } from 'vue'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

interface IUseShareAnnouncement {
  isShowShareBadge: Ref<boolean>
  markShareClicked: () => void
}

export const useShareAnnouncement = (): IUseShareAnnouncement => {
  const isShowShareBadge = ref<boolean>(
    localStorage.getItem(LocalStorageKey.SHARE_BUTTON_CLICKED) !== 'true',
  )

  const markShareClicked = (): void => {
    if (!isShowShareBadge.value) return
    isShowShareBadge.value = false
    localStorage.setItem(LocalStorageKey.SHARE_BUTTON_CLICKED, 'true')
  }

  return {
    isShowShareBadge,
    markShareClicked,
  }
}
