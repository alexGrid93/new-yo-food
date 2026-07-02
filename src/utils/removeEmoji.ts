const EMOJI_LENGTH = 2

export const removeEmoji = (food: string): string => food.slice(EMOJI_LENGTH).trim()
