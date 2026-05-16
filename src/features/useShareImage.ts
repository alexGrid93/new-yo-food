import axios from 'axios'
import { ref } from 'vue'
import { IMAGE_API_URL } from '@/constants/apiUrls.ts'

interface IShareImage {
  dateInfo: string
  userName: string
  menu: string[]
}

interface IShareImageMenuItem {
  description: string
  emoji?: string
}

export const useShareImage = () => {
  const imageResponse = ref();
  const isOpenShareModal = ref(false);

  const openShareModal = () => isOpenShareModal.value = true;
  const closeShareModal = () => isOpenShareModal.value = false;

  const parseToNormalFormat = (menuItem: string): IShareImageMenuItem => ({
    description: menuItem,
  });

  const onClick = async (options: IShareImage) => {
    openShareModal();

    const generateImageOptionsJson = {
      template: 'base',
      variables: {
        ...options,
        items: options.menu.map((item) => parseToNormalFormat(item)),
        imageUrl: 'https://www.yofood.ru/assets/mascot-_6b4Xap7.png'
      }
    }

    const {data} = await axios.post(`${IMAGE_API_URL}/api/v1/image`, {
      ...generateImageOptionsJson
    })

    imageResponse.value = data.image;
  };

  const resetImageResponse = () => imageResponse.value = '';

  return {
    imageResponse,
    isOpenShareModal,
    onClick,
    openShareModal,
    closeShareModal,
    resetImageResponse,
  }
};
