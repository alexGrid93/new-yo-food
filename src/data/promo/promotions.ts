import type { IPromo } from '@/types/promo.ts'

import CoverJPG from '../../assets/promo/uziwa/cover.jpg'
import CoverWEBP from '../../assets/promo/uziwa/cover.webp'
import { SocialType } from '@/enums/SocialType.ts'

export const REAL_PROMO_INDEX = 2

export const promotions: IPromo[] = [
  {
    title: 'promotions_data.uziwa.title',
    subtitle: 'promotions_data.uziwa.subtitle',
    percentSale: 15,
    description: 'promotions_data.uziwa.description',
    img: CoverJPG,
    imgWebp: CoverWEBP,
    social: [
      {
        type: SocialType.INSTAGRAM,
        name: 'uziwa.wine',
        link: 'https://www.instagram.com/uziwa.wine/',
      },
    ],
    promocode: 'YO15BONUZI',
  },
]
