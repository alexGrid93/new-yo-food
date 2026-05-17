import { computed, ref } from 'vue'
import { domToBlob } from 'modern-screenshot'

interface IShareImageOptions {
  dateInfo: string
  userName: string
  menu: string[]
}

interface IShareItem {
  text: string
  selected: boolean
}

const FILE_NAME = 'yofood.png'

export const useShareImage = () => {
  const isOpenPreShareModal = ref(false)
  const isOpenShareModal = ref(false)

  const dateInfo = ref('')
  const userName = ref('')
  const menuItems = ref<IShareItem[]>([])

  const templateRef = ref<HTMLElement | null>(null)
  const imageBlob = ref<Blob | null>(null)
  const imageUrl = ref<string>('')
  const isCopied = ref(false)

  const probeFile = new File([''], FILE_NAME, { type: 'image/png' })
  const canNativeShare = computed(
    () =>
      typeof navigator !== 'undefined' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({ files: [probeFile] }),
  )
  const canCopy = computed(
    () =>
      typeof navigator !== 'undefined' &&
      typeof navigator.clipboard?.write === 'function' &&
      typeof window !== 'undefined' &&
      typeof window.ClipboardItem === 'function',
  )

  const revokeUrl = () => {
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
      imageUrl.value = ''
    }
  }

  const openPreShareModal = (options: IShareImageOptions) => {
    dateInfo.value = options.dateInfo
    userName.value = options.userName
    menuItems.value = options.menu.map((text) => ({ text, selected: true }))
    revokeUrl()
    imageBlob.value = null
    isCopied.value = false
    isOpenPreShareModal.value = true
  }

  const closePreShareModal = () => {
    isOpenPreShareModal.value = false
  }

  const toggleItem = (index: number) => {
    const item = menuItems.value[index]
    if (item) item.selected = !item.selected
  }

  const generateImage = async () => {
    if (!templateRef.value) return

    isOpenPreShareModal.value = false
    isOpenShareModal.value = true
    revokeUrl()
    imageBlob.value = null
    isCopied.value = false

    try {
      const blob = await domToBlob(templateRef.value, { scale: 2, type: 'image/png' })
      if (!blob) throw new Error('Empty blob')
      imageBlob.value = blob
      imageUrl.value = URL.createObjectURL(blob)
    } catch (e) {
      console.error('[share] failed to render image', e)
    }
  }

  const shareImage = async () => {
    if (!imageBlob.value) return
    const file = new File([imageBlob.value], FILE_NAME, { type: 'image/png' })
    try {
      await navigator.share({ files: [file] })
    } catch (e) {
      if ((e as DOMException)?.name !== 'AbortError') {
        console.error('[share] navigator.share failed', e)
      }
    }
  }

  const downloadImage = () => {
    if (!imageUrl.value) return
    const a = document.createElement('a')
    a.href = imageUrl.value
    a.download = FILE_NAME
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const copyImage = async () => {
    if (!imageBlob.value) return
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': imageBlob.value }),
      ])
      isCopied.value = true
      setTimeout(() => (isCopied.value = false), 2000)
    } catch (e) {
      console.error('[share] clipboard write failed', e)
    }
  }

  const resetImageResponse = () => {
    revokeUrl()
    imageBlob.value = null
  }

  return {
    isOpenPreShareModal,
    isOpenShareModal,
    imageUrl,
    imageBlob,
    isCopied,
    canNativeShare,
    canCopy,
    dateInfo,
    userName,
    menuItems,
    templateRef,
    onClick: openPreShareModal,
    closePreShareModal,
    toggleItem,
    generateImage,
    shareImage,
    downloadImage,
    copyImage,
    resetImageResponse,
  }
}
