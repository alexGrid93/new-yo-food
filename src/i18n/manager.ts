import type { I18n } from 'vue-i18n'

let _i18n: I18n | null = null
const _fallbackLocale = 'en'

export const I18nManager = {
  init(i18nInstance: I18n) {
    if (!i18nInstance?.global?.locale) {
      throw new Error('I18nManager.init: invalid i18n instance')
    }
    _i18n = i18nInstance

    const userLocale = localStorage.getItem('user-locale')

    if (userLocale) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _i18n.global.locale.value = localStorage.getItem('user-locale')
      document.documentElement.lang = <string>localStorage.getItem('user-locale')
    }
  },

  getCurrentLocale(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!_i18n.global.locale.value) {
      return _fallbackLocale
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return _i18n.global.locale.value
  },

  getCurrentUserLocale(): string | null {
    return localStorage.getItem('user-locale')
  },

  async setLocale(newLocale: string) {
    if (!_i18n) throw new Error('I18nManager.setLocale called before init')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const current = _i18n.global.locale.value

    if (current !== newLocale) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _i18n.global.locale.value = newLocale
    }

    document.documentElement.lang = newLocale
    localStorage.setItem('user-locale', newLocale)
  },
}
