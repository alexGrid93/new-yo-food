import { SocialType } from '@/enums/SocialType.ts'

interface IPromoStyle {
  gradientColor?: string;
  color?: string;
  titleColor?: string;
  subtitleColor?: string;
  percentColor?: string;
}

interface ISocial {
  type: SocialType
  name: string
  link: string
}

export interface IPromo {
  title: string
  subtitle: string
  percentSale: number
  description: string
  img: string
  imgWebp: string
  style?: IPromoStyle
  social?: ISocial[]
  promocode: string
}
